"use client";

import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, formatRupiah } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { productColumns } from "./columns";
import CreateProductSheet from "./create-product-sheet";

const Products = () => {
  const { data: products, isPending } = useQuery<any[]>({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/product");
        return res.json();
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  });

  return (
    <div className="flex flex-col gap-8">
      <TotalStock />
      <DataTable
        columns={productColumns}
        data={products || []}
        isLoading={isPending}
        footer={<CreateProductSheet />}
      />
    </div>
  );
};

const TotalStock = ({ className }: { className?: string }) => {
  const { data: stock, isLoading } = useQuery({
    queryKey: ["dashboard", "stock"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard/total_stock");
      return res.json();
    },
  });

  return (
    <Card className={cn("w-52", className)}>
      <CardHeader>
        <CardTitle>Total Nilai Stok</CardTitle>
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
        </div>
      </CardContent>
    </Card>
  );
};

export default Products;
