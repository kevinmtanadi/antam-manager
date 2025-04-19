import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { searchParams } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "sonner";

const DeleteProductDialog = ({
  id,
  name,
  open,
  onOpenChange,
}: {
  id: string;
  name: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const queryClient = useQueryClient();
  const [confirmation, setConfirmation] = useState("");

  const { mutate } = useMutation({
    mutationFn: async (id: string) => {
      if (confirmation.toLowerCase() !== "hapus") {
        throw new Error("Konfirmasi tidak sesuai");
      }

      const queryParams = searchParams({ id: id });
      const res = await fetch("/api/product?" + queryParams.toString(), {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Gagal menghapus produk");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      onOpenChange(false);
      toast.success("Berhasil menghapus produk");
    },
    onError: () => {
      toast.error("Gagal menghapus produk");
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apakah anda yakin?</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="flex flex-col gap-8 items-center text-start">
            <p className="text-muted-foreground">
              Anda akan menghapus produk <b className="text-black">{name}</b>.
              Data transaksi sebelumnya tidak akan ikut terhapus. Aksi ini{" "}
              <b className="text-black">TIDAK DAPAT </b>
              dikembalikan.
            </p>
            <div className="w-full flex flex-col gap-2">
              <p className="text-muted-foreground text-sm">
                Mohon ketik hapus <span className="font-semibold">hapus</span>{" "}
                mengonfirmasi
              </p>
              <Input
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value)}
              />
              <Button
                onClick={() => {
                  mutate(id);
                }}
                disabled={confirmation.toLowerCase() !== "hapus"}
                className="h-9 w-full text-base bg-red-600 hover:bg-red-500"
              >
                Saya yakin ingin menghapus produk ini
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProductDialog;
