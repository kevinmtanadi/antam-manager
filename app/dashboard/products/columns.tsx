import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatRupiah } from "@/lib/utils";
import { ColumnDef, Row } from "@tanstack/react-table";
import { MoreVerticalIcon } from "lucide-react";
import Link from "next/link";
import DeleteProductDialog from "./delete-product-dialog";
import { useState } from "react";
import EditProductSheet from "./edit-product-sheet";

export const productColumns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: () => {
      return <div className="flex justify-center">Kode Produk</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="w-12 text-center">
          <Link
            className=" underline font-semibold"
            href={`/dashboard/products/${row.original.id}`}
          >
            {row.original.id}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: () => {
      return "Header";
    },
    cell: ({ row }) => {
      return <div className="w-32 text-start">{row.original.name}</div>;
    },
  },
  {
    accessorKey: "weight",
    header: () => {
      return "Berat (g)";
    },
    cell: ({ row }) => {
      return <div className="text-start w-16">{row.original.weight} g</div>;
    },
  },
  {
    accessorKey: "stock",
    header: () => {
      return "Qty";
    },
    cell: ({ row }) => {
      return <div className="text-start w-8">{row.original.stock || "-"}</div>;
    },
  },
  {
    accessorKey: "avg_price",
    header: () => {
      return "Harga rata-rata";
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <div className="text-start w-32">
            {formatRupiah(row.original.avg_price)}
          </div>
          <div className="text-muted-foreground text-xs">
            {row.original.avg_price !== 0
              ? formatRupiah(row.original.avg_price / row.original.weight) +
                "/g"
              : "-"}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "total_price",
    header: () => {
      return "Total stok";
    },
    cell: ({ row }) => {
      return (
        <div className="text-start w-32">
          {formatRupiah(row.original.total_price)}
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      return <ActionDropdown row={row} />;
    },
  },
];

const ActionDropdown = ({ row }: { row: Row<any> }) => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
            size="icon"
          >
            <MoreVerticalIcon />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            Hapus
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditProductSheet
        id={row.original.id}
        open={editOpen}
        setOpen={setEditOpen}
      />
      <DeleteProductDialog
        open={open}
        onOpenChange={setOpen}
        id={row.original.id}
        name={row.original.name}
      />
    </>
  );
};
