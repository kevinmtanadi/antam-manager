import { formatDate, formatRupiah } from "@/lib/utils";
import { ColumnDef, Row } from "@tanstack/react-table";
import Link from "next/link";
import DeleteTransactionDialog from "./delete-transacation-dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import TransactionStatusBadge from "@/components/transaction-status-badge";

export const transactionColumns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: () => {
      return <div className="flex justify-center">ID Transaksi</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="w-32 text-start ms-1">
          <Link
            className=" underline font-semibold"
            href={`/dashboard/transactions/${row.original.id}`}
          >
            {row.original.id}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: () => {
      return "Tanggal Transaksi";
    },
    cell: ({ row }) => {
      return (
        <div className="">
          {formatDate(row.original.createdAt, "dd mmm yyyy")}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => {
      return "Status";
    },
    cell: ({ row }) => {
      const status = row.original.status;
      return <TransactionStatusBadge status={status} />;
    },
  },
  {
    accessorKey: "totalPrice",
    header: () => {
      return "Harga";
    },
    cell: ({ row }) => {
      return (
        <div className="text-start w-24">
          {formatRupiah(row.original.totalPrice) || "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "profit",
    header: () => {
      return "Profit";
    },
    cell: ({ row }) => {
      return (
        <div className="text-start w-24">
          {formatRupiah(row.original.profit)}
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: "",
    cell: ({ row }) => {
      return (
        <div className="flex gap-1">
          <DeleteTransactionWrapper row={row} />
        </div>
      );
    },
  },
];

const DeleteTransactionWrapper = ({ row }: { row: Row<any> }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex gap-1">
        <Button variant={"ghost"} onClick={() => setOpen(true)}>
          <Trash />
        </Button>
      </div>
      <DeleteTransactionDialog
        id={row.original.id}
        open={open}
        onOpenChange={(open: boolean) => setOpen(open)}
      />
    </>
  );
};
