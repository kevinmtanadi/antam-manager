"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, formatDate, formatRupiah, searchParams } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export const Overview = ({ className }: { className?: string }) => {
  const { data: stock, isLoading } = useQuery({
    queryKey: ["dashboard", "stock"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard/total_stock");
      return res.json();
    },
  });

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <div className="">
            {isLoading ? (
              <Skeleton className="h-8 w-full" />
            ) : (
              <p className="text-xl font-bold">
                {formatRupiah(stock.total.value)}
              </p>
            )}
            <p className="text-muted-foreground text-sm">Total Nilai Stok</p>
          </div>
          <Separator />
          {stock &&
            stock.stocks.length > 0 &&
            stock.stocks.map((stock: any) => (
              <div className="flex justify-between" key={stock.id}>
                <p className="text-muted-foreground text-sm text-start">
                  {stock.name}
                </p>
                <p className="text-sm text-end">
                  {formatRupiah(stock.total_price)}
                </p>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

export const TransactionOverview = ({ className }: { className?: string }) => {
  const { data: transaction, isLoading } = useQuery({
    queryKey: ["dashboard", "transaction"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard/total_transaction");
      return res.json();
    },
  });

  const { data: recentTransactions, isLoading: isRecentTransactionLoading } =
    useQuery({
      queryKey: ["dashboard", "transactions"],
      queryFn: async () => {
        const queryParams = searchParams({
          page: 1,
          rows_per_page: 5,
        });
        const res = await fetch(`/api/transaction?${queryParams.toString()}`, {
          method: "GET",
        });
        return res.json();
      },
    });

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Transaksi</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <div className="">
            {isLoading ? (
              <Skeleton className="h-8 w-full" />
            ) : (
              <p className="text-xl font-bold">{transaction.value}</p>
            )}
            <p className="text-sm text-muted-foreground">Jumlah Transaksi</p>
          </div>
          <Separator />
          <h3 className="font-semibold">Transaksi Terbaru</h3>
          {isRecentTransactionLoading
            ? [1, 2, 3, 4, 5].map((item) => (
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <Skeleton className="w-32 h-5 rounded-sm" />
                    <Skeleton className="w-16 h-4 rounded-sm" />
                  </div>
                  <Skeleton className="w-28 h-9 rounded-sm" />
                </div>
              ))
            : recentTransactions &&
              recentTransactions.transactions.length > 0 &&
              recentTransactions.transactions.map((transaction: any) => (
                <div className="flex justify-between" key={transaction.id}>
                  <div className="flex flex-col">
                    <p className="text-sm text-start">{transaction.id}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(transaction.createdAt, "dd-mm-yyyy")}
                    </p>
                  </div>
                  <p
                    className={cn(
                      "text-sm text-end font-semibold",
                      transaction.status === "SALE"
                        ? "text-green-600"
                        : "text-red-600"
                    )}
                  >
                    {transaction.status === "SALE" ? "+" : "-"}
                    {formatRupiah(transaction.totalPrice)}
                  </p>
                </div>
              ))}
          <Button asChild className="w-full mt-4">
            <Link href={"/dashboard/transactions"}>Semua Transaksi</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export const ProfitOverview = ({ className }: { className?: string }) => {
  const { data: profit, isLoading } = useQuery({
    queryKey: ["dashboard", "profit"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard/profit");
      return res.json();
    },
  });

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Profit</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-8 w-full" />
        ) : (
          <p className="text-xl font-bold">{formatRupiah(profit.value)}</p>
        )}
      </CardContent>
    </Card>
  );
};
