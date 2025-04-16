import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatDate, formatRupiah } from "@/lib/utils";
import { ColumnDef, Row } from "@tanstack/react-table";
import { useEffect, useState } from "react";

export const inventoryColumns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: () => {
      return <div className="flex justify-center ">Kode Stok</div>;
    },
    cell: ({ row }) => {
      return <CopyPopover row={row} />;
    },
  },
  {
    accessorKey: "product",
    header: "Produk",
    cell: ({ row }) => {
      return (
        <div className="w-48 text-start">
          <p className="">{row.original.productId}</p>
          <p className="text-muted-foreground">{row.original.product.name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "weight",
    header: () => {
      return "Berat (g)";
    },
    cell: ({ row }) => {
      return (
        <div className="text-start w-16">{row.original.product.weight} g</div>
      );
    },
  },

  {
    accessorKey: "cost",
    header: () => {
      return "Harga";
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <div className="text-start w-32">
            {formatRupiah(row.original.cost)}
          </div>
          <div className="text-muted-foreground text-xs">
            {formatRupiah(row.original.cost / row.original.product.weight)}/g
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Tanggal Pembelian",
    cell: ({ row }) => {
      return (
        <div className="text-center">
          {formatDate(row.original.createdAt, "dd mmm yyyy")}
        </div>
      );
    },
  },
];

const CopyPopover = ({ row }: { row: Row<any> }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      setOpen(false);
    }, 700); // Auto-dismiss after 2 seconds

    return () => clearTimeout(timer);
  }, [open]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          onClick={() => {
            navigator.clipboard.writeText(row.original.id);
          }}
          className="w-24 text-center font-semibold underline cursor-pointer"
        >
          {row.original.id}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-24 text-center p-1 text-sm">
        <p className="">Copied!</p>
      </PopoverContent>
    </Popover>
  );
};

// const CopyPopover = () => {
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     if (!open) return;

//     const timer = setTimeout(() => {
//       setOpen(false);
//     }, 2000); // Auto-dismiss after 2 seconds

//     return () => clearTimeout(timer);
//   }, [open]);

//   const handleClick = () => {
//     // Simulate copy action
//     navigator.clipboard.writeText("Some text to copy");
//     setOpen(true);
//   };

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//         <div
//           onClick={() => {
//             navigator.clipboard.writeText(row.original.id);
//           }}
//           className="w-24 text-center font-semibold underline cursor-pointer"
//         >
//           {row.original.id}
//         </div>
//       </PopoverTrigger>
//       <PopoverContent>
//         <p className="w-24 text-center font-semibold underline cursor-pointer">
//           Copied
//         </p>
//       </PopoverContent>
//     </Popover>
//   );
// };
