"use client";

import React, { useEffect, useState } from "react";
import { FetchStockData, FetchStockParams } from "../../inventory/inventory";
import { useQuery } from "@tanstack/react-query";
import { searchParams } from "@/lib/utils";
import Paginator from "@/components/paginator";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "@/components/data-table";
import { inventoryColumns } from "../../inventory/columns";
import DebounceInput from "@/components/debounce-input";

const ProductDetail = ({ params }: { params: { id: string } }) => {
  const [fetchParams, setFetchParams] = useState<FetchStockParams>({
    search: "",
    page: 1,
    rows_per_page: 10,
    productId: params.id,
  });

  const { data, isPending } = useQuery({
    queryKey: ["stocks", params],
    queryFn: async (): Promise<FetchStockData> => {
      const queryParams = searchParams(fetchParams);
      const res = await fetch(`/api/product/stock?${queryParams.toString()}`);
      if (!res.ok) {
        throw new Error("Gagal mengambil data");
      }
      const data = await res.json();
      return data as FetchStockData;
    },
  });

  const [totalData, setTotalData] = useState({
    filtered: 0,
    total: 0,
  });
  useEffect(() => {
    if (data) {
      setTotalData({
        filtered: data.totalFiltered,
        total: data.totalItems,
      });
    }
  }, [data]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between gap-8">
        <DebounceInput
          className="w-1/2"
          placeholder="Cari produk berdasarkan kode stok"
          defaultValue={fetchParams.search}
          onChange={(value) =>
            setFetchParams({ ...fetchParams, search: value })
          }
        />
      </div>
      <DataTable
        columns={inventoryColumns}
        data={data?.stocks || []}
        skeleton={<Skeleton className="w-full h-10" />}
        isLoading={isPending}
      />
      <div className="flex flex-col gap-y-6 items-center w-full md:flex-row md:justify-between ">
        {isPending ? (
          <Skeleton className="w-80 h-6" />
        ) : (
          <p className="text-sm text-muted-foreground">
            Showing items{" "}
            {totalData.filtered !== 0
              ? (fetchParams.page - 1) * fetchParams.rows_per_page + 1
              : 0}{" "}
            to{" "}
            {Math.min(
              fetchParams.page * fetchParams.rows_per_page,
              totalData.filtered
            )}{" "}
            of {totalData.filtered}
          </p>
        )}

        <Paginator
          totalItems={totalData.filtered}
          rowsPerPage={fetchParams.rows_per_page}
          currentPage={fetchParams.page}
          onPageChange={(page) => setFetchParams({ ...fetchParams, page })}
        />
      </div>
    </div>
  );
};

export default ProductDetail;
