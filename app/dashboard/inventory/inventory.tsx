"use client";

import { DataTable } from "@/components/data-table";
import { searchParams } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { inventoryColumns } from "./columns";
import DebounceInput from "@/components/debounce-input";
import Paginator from "@/components/paginator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export interface FetchStockParams {
  search?: string;
  weight?: number;
  page: number;
  rows_per_page: number;
  productId?: string;
}

export interface FetchStockData {
  stocks: {
    id: string;
    productId: string;
    cost: number;
    createdAt: string;
    transactionId: string;
    product: {
      name: string;
      weight: number;
    };
  }[];
  totalItems: number;
  totalFiltered: number;
}

const Inventory = ({ types }: { types: Type[] }) => {
  const [params, setParams] = useState<FetchStockParams>({
    search: "",
    page: 1,
    rows_per_page: 10,
    productId: "",
  });

  const { data, isPending } = useQuery({
    queryKey: ["stocks", params],
    queryFn: async (): Promise<FetchStockData> => {
      const queryParams = searchParams(params);
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
          defaultValue={params.search}
          onChange={(value) => setParams({ ...params, search: value })}
        />
        <Select
          defaultValue={"all"}
          onValueChange={(value) => setParams({ ...params, productId: value })}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {types?.map((type: Type) => (
              <SelectItem key={type.id} value={type.id}>
                {type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
              ? (params.page - 1) * params.rows_per_page + 1
              : 0}{" "}
            to{" "}
            {Math.min(params.page * params.rows_per_page, totalData.filtered)}{" "}
            of {totalData.filtered} (filtered from {totalData.total} items)
          </p>
        )}

        <Paginator
          totalItems={totalData.filtered}
          rowsPerPage={params.rows_per_page}
          currentPage={params.page}
          onPageChange={(page) => setParams({ ...params, page })}
        />
      </div>
    </div>
  );
};

export default Inventory;
