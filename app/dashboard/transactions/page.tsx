"use client";

import { DataTable } from "@/components/data-table";
import { searchParams } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { transactionColumns } from "./columns";
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

interface TransactionObj {
  id: string;
  createdAt: string;
  status: string;
  profit: number;
  totalPrice: number;
}

interface FetchTransactionParams {
  id: string;
  date: string;
  page: number;
  rows_per_page: number;
  status: string;
}

interface FetchTransactionData {
  transactions: TransactionObj[];
  totalItems: number;
  totalFiltered: number;
}
const TransactionHistory = ({ types }: { types: Type[] }) => {
  const [params, setParams] = useState<FetchTransactionParams>({
    id: "",
    date: "",
    page: 1,
    rows_per_page: 10,
    status: "",
  });

  const { data, isPending } = useQuery({
    queryKey: ["transactions", params],
    queryFn: async (): Promise<FetchTransactionData> => {
      const queryParams = searchParams(params);
      const res = await fetch(`/api/transaction?${queryParams.toString()}`);
      if (!res.ok) {
        throw new Error("Gagal mengambil data");
      }
      const data = await res.json();
      return data as FetchTransactionData;
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
          placeholder="Cari transaksi berdasarkan ID"
          defaultValue={params.id}
          onChange={(value) => setParams({ ...params, id: value })}
        />
        <Select
          onValueChange={(value) => setParams({ ...params, status: value })}
        >
          <SelectTrigger className="w-1/2 md:w-[350px]">
            <SelectValue placeholder="Cari berdasarkan tipe transaksi" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="PURCHASE">Beli</SelectItem>
            <SelectItem value="SALE">Jual</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <DataTable
        columns={transactionColumns}
        data={data?.transactions || []}
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

export default TransactionHistory;
