"use client";

import { formatRupiah } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const transactionItemColumns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: () => {
      return <div className=" w-48 ms-5">Kode Stok</div>;
    },
    cell: ({ row }) => {
      return <div className="w-48 ms-5">{row.original.stockId}</div>;
    },
  },
  {
    accessorKey: "product",
    header: () => {
      return "Kode Produk";
    },
    cell: ({ row }) => {
      return (
        <Link
          href={`/dashboard/products/${row.original.productId}`}
          className="w-36 underline font-semibold"
        >
          {row.original.productId}
        </Link>
      );
    },
  },
  {
    accessorKey: "price",
    header: () => {
      return <div className="text-end me-5">Harga</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="text-end me-5">{formatRupiah(row.original.price)}</div>
      );
    },
  },
];
