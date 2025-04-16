import { Badge } from "@/components/ui/badge";
import { formatDate, formatRupiah } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

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
      switch (status) {
        case "PURCHASE":
          return (
            <Badge className="px-4 bg-green-300 text-green-800 font-semibold text-md">
              Beli
            </Badge>
          );
        case "SALE":
          return (
            <Badge className="px-4 bg-red-300 text-red-800 font-semibold text-md">
              Jual
            </Badge>
          );
        default:
          return status;
      }
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
  //   {
  //     accessorKey: "action",
  //     header: () => {
  //       return "";
  //     },
  //     cell: ({ row }) => {
  //       return (
  //         <div className="text-start w-32">
  //           {formatRupiah(row.original.total_price)}
  //         </div>
  //       );
  //     },
  //   },
];
