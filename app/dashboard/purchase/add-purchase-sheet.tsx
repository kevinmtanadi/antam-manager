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
import { addPurchaseItemSchema } from "@/lib/zod"; // adjust path as needed
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
import { Plus } from "lucide-react";
import { useState } from "react";
import { NumberInput } from "@/components/number-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PurchaseItem } from "./purchase";
import { Type } from "@/lib/intf";

const AddPurchaseSheet = ({
  types,
  onSubmit: onAdd,
}: {
  types: Type[];
  onSubmit: (item: PurchaseItem) => void;
}) => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof addPurchaseItemSchema>>({
    resolver: zodResolver(addPurchaseItemSchema),
    defaultValues: {
      stockId: "",
      productId: "",
      price: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof addPurchaseItemSchema>) {
    onAdd(values);
    form.reset();
    setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <div className="w-full flex h-12 items-center justify-center">
        <Button onClick={() => setOpen(true)} className="w-48 h-8 rounded-md ">
          <Plus className="mr-2 h-4 w-4" />
          Tambah Item
        </Button>
      </div>
      <SheetContent side="right" className="flex flex-col">
        <SheetHeader className="gap-1">
          <SheetTitle>Tambah Item</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-1 flex-col gap-4 overflow-y-auto py-4 px-1 text-sm"
          >
            <FormField
              control={form.control}
              name="stockId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kode Stok</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kode Produk</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih jenis produk" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {types?.map((type: { id: string; name: string }) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Harga</FormLabel>
                  <FormControl>
                    <NumberInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter className="mt-auto flex gap-2 flex-col gap-y-4">
              <Button className="w-full" type="submit">
                Tambah
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

export default AddPurchaseSheet;
