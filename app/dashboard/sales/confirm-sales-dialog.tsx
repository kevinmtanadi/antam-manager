import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatRupiah } from "@/lib/utils";
import { SalesItem } from "./sales";

interface Props {
  items: SalesItem[];
  disabled?: boolean;
  types: Type[];
  onComplete: () => void;
}

const ConfirmSalesDialog = ({ items, disabled, types, onComplete }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} className="w-[150px] self-end">
          Jual
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Konfirmasi Transaksi</DialogTitle>
          <DialogDescription>
            Periksa kembali item yang akan dijual
          </DialogDescription>
        </DialogHeader>
        <Table className="border">
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead className="text-center font-semibold">
                Kode Stok
              </TableHead>
              <TableHead className="text-start font-semibold border-r">
                Kode Produk
              </TableHead>
              <TableHead className="text-center font-semibold">Harga</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell className="text-center">{item.stockId}</TableCell>
                <TableCell className="text-start border-r">
                  <div className="flex flex-col">
                    <span>{item.productId}</span>
                    <span className="text-xs text-muted-foreground">
                      {types.filter((t) => t.id === item.productId)[0].name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-end">
                  {formatRupiah(item.price)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className="font-bold text-end border-r" colSpan={2}>
                Total
              </TableCell>
              <TableCell className="font-bold text-end">
                {formatRupiah(items.reduce((a, b) => a + b.price, 0))}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <DialogFooter>
          <Button onClick={onComplete}>Konfirmasi</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmSalesDialog;
