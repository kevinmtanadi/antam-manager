import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";

export const purchaseColumns: ColumnDef<any>[] = [
  {
    accessorKey: "stock_id",
    header: () => {
      return <div className="flex justify-center ">Kode Stok</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <p>{row.original.stockId}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "product",
    header: "Produk",
    cell: ({ row }) => {
      return (
        <div className="w-48 text-start">
          <p className="">{row.original.productId}</p>
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
          <div className="text-start w-32">
            {formatRupiah(row.original.price)}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <Button variant={"ghost"}>
            <Trash />
          </Button>
        </div>
      );
    },
  },
];
