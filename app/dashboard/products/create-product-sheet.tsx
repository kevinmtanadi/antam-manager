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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { NumberInput } from "@/components/number-input";

const CreateProductSheet = () => {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof upcreateProductSchema>>({
    resolver: zodResolver(upcreateProductSchema),
    defaultValues: {
      id: "",
      name: "",
      weight: undefined,
    },
  });

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof upcreateProductSchema>) => {
      const res = await fetch("/api/product", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Gagal menambahkan produk");
      }

      return res.json();
    },
    onSuccess: () => {
      form.reset();
      toast.success("Berhasil menambahkan produk");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      setOpen(false);
    },
    onError: () => {
      toast.error("Gagal menambahkan produk");
    },
  });

  function onSubmit(values: z.infer<typeof upcreateProductSchema>) {
    mutate(values);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <div className="w-full flex h-12 items-center justify-center">
        <Button onClick={() => setOpen(true)} className="w-48 h-8 rounded-md ">
          <Plus className="mr-2 h-4 w-4" />
          Tambah Produk
        </Button>
      </div>
      <SheetContent side="right" className="flex flex-col">
        <SheetHeader className="gap-1">
          <SheetTitle>Tambah Produk</SheetTitle>
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
                    <Input placeholder="001" {...field} />
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
                    <Input placeholder="Antam 1 gram" {...field} />
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
                    <NumberInput
                      allowDecimal
                      placeholder="1"
                      className="w-1/2"
                      {...field}
                    />
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

export default CreateProductSheet;
