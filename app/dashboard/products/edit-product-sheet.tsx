"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { upcreateProductSchema } from "@/lib/zod"; // adjust path as needed
import { z } from "zod";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader, Plus } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { NumberInput } from "@/components/number-input";
import { useEffect } from "react";

interface Props {
  id: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const EditProductSheet = ({ id, open, setOpen }: Props) => {
  const { data, isPending: isProductPending } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await fetch(`/api/product/${id}`);
      const data = await res.json();

      console.log(data);
      return data;
    },
    enabled: open && !!id,
  });

  const form = useForm<z.infer<typeof upcreateProductSchema>>({
    resolver: zodResolver(upcreateProductSchema),
    defaultValues: {
      id: "",
      name: "",
      weight: undefined,
    },
  });

  useEffect(() => {
    if (!isProductPending && data) {
      console.log(data);
      form.setValue("id", data.product.id);
      form.setValue("name", data.product.name);
      form.setValue("weight", data.product.weight);
    }
  }, [data, isProductPending]);

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof upcreateProductSchema>) => {
      const res = await fetch("/api/product", {
        method: "PUT",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Gagal memperbarui produk");
      }

      return res.json();
    },
    onSuccess: () => {
      form.reset();
      toast.success("Berhasil memperbarui produk");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      setOpen(false);
    },
    onError: () => {
      toast.error("Gagal memperbarui produk");
    },
  });

  function onSubmit(values: z.infer<typeof upcreateProductSchema>) {
    mutate(values);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="flex flex-col">
        <SheetHeader className="gap-1">
          <SheetTitle>Edit Produk</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-1 flex-col gap-4 overflow-y-auto py-4 px-1 text-sm"
          >
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kode Produk</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Produk</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Berat (g)</FormLabel>
                  <FormControl>
                    <NumberInput allowDecimal className="w-1/2" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter className="mt-auto flex gap-2 sm:flex-col sm:space-x-0">
              <Button className="w-full " type="submit" disabled={isPending}>
                Buat
                <Loader
                  className={`ml-2 h-4 w-4 animate-spin ${
                    isPending ? "" : "hidden"
                  }`}
                />
              </Button>
              <SheetClose asChild>
                <Button className="w-full" variant={"outline"}>
                  Batal
                </Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default EditProductSheet;
