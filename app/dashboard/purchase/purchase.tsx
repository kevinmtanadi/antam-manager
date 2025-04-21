"use client";

import { DataTable } from "@/components/data-table";
import { DatePicker } from "@/components/datepicker";
import { formatRupiah } from "@/lib/utils";
import React, { useState } from "react";
import AddPurchaseSheet from "./add-purchase-sheet";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import UpdatePurchaseSheet from "./update-purchase-sheet";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import ConfirmPurchaseDialog from "./confirm-purchase-dialog";
import { Type } from "@/lib/intf";

export interface PurchaseItem {
  stockId: string;
  productId: string;
  price: number;
}

const Purchase = ({ types }: { types: Type[] }) => {
  const today = new Date();
  const [date, setDate] = useState<Date | undefined>(today);
  const [items, setItems] = useState<PurchaseItem[]>([]);

  const addItem = (item: PurchaseItem) => {
    setItems([
      ...items,
      {
        stockId: item.stockId,
        productId: item.productId,
        price: item.price,
      },
    ]);
  };

  const removeItem = (idx: number) => {
    setItems(items.filter((_, i) => i !== idx));
  };

  const updateItem = (idx: number, item: PurchaseItem) => {
    setItems(items.map((i, j) => (j === idx ? { ...i, ...item } : i)));
  };

  const purchaseColumns: ColumnDef<any>[] = [
    {
      accessorKey: "stock_id",
      header: () => {
        return <div className="ms-5">Kode Stok</div>;
      },
      cell: ({ row }) => {
        return (
          <div className="ms-5">
            <p>{row.original.stockId}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "product",
      header: () => {
        return <div className="text-start">Kode Produk</div>;
      },
      cell: ({ row }) => {
        return (
          <div className="flex flex-col">
            <span>{row.original.productId}</span>
            <span className="text-xs text-muted-foreground">
              {types.filter((t) => t.id === row.original.productId)[0].name}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "price",
      header: () => {
        return "Harga";
      },
      cell: ({ row }) => {
        return (
          <div className="">
            <div className="text-start">{formatRupiah(row.original.price)}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "actions",
      header: "",
      cell: ({ row }) => {
        return (
          <div className="flex gap-1 justify-end">
            <UpdatePurchaseSheet
              item={row.original}
              onSubmit={(item) => updateItem(row.index, item)}
              types={types}
            />
            <Button variant={"ghost"} onClick={() => removeItem(row.index)}>
              <Trash />
            </Button>
          </div>
        );
      },
    },
  ];

  const { mutate } = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/transaction", {
        method: "POST",
        body: JSON.stringify({
          createdAt: date,
          status: "PURCHASE",
          items: items,
        }),
      });
      if (!res.ok) {
        throw new Error("Gagal menambahkan transaksi");
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success("Transaksi sukses");
    },
    onError: () => {
      toast.error("Terjadi kendala saat melakukan transaksi");
    },
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p>Tanggal Transaksi</p>
        <DatePicker date={date} setDate={setDate} />
      </div>
      <DataTable
        data={items}
        columns={purchaseColumns}
        footer={
          <AddPurchaseSheet types={types} onSubmit={(item) => addItem(item)} />
        }
        emptyMessage="Belum ada item"
      />
      <div className="self-end">
        <ConfirmPurchaseDialog
          items={items}
          types={types}
          disabled={items.length === 0}
          onComplete={mutate}
        />
      </div>
    </div>
  );
};

export default Purchase;
