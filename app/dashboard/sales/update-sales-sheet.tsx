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
import { addSalesItemSchema } from "@/lib/zod"; // adjust path as needed
import { z } from "zod";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { NumberInput } from "@/components/number-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SalesItem } from "./sales";
import { Type } from "@/lib/intf";
import { SelectStock } from "./add-sales-sheet";

const UpdateSalesSheet = ({
  item,
  types,
  onSubmit: onSave,
}: {
  item: SalesItem;
  types: Type[];
  onSubmit: (item: SalesItem) => void;
}) => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof addSalesItemSchema>>({
    resolver: zodResolver(addSalesItemSchema),
    defaultValues: item,
  });

  function onSubmit(values: z.infer<typeof addSalesItemSchema>) {
    onSave(values);
    form.reset();
    setOpen(false);
  }

  const [selectedProduct, setSelectedProduct] = useState("");
  useEffect(() => {
    const productId = form.getValues("productId");
    if (productId) {
      setSelectedProduct(productId);
    }
  }, [form.watch("productId")]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Button variant={"ghost"} onClick={() => setOpen(true)}>
        <Pencil />
      </Button>
      <SheetContent side="right" className="flex flex-col">
        <SheetHeader className="gap-1">
          <SheetTitle>Update Item</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-1 flex-col gap-4 overflow-y-auto py-4 px-1 text-sm"
          >
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
              name="stockId"
              render={({}) => (
                <FormItem>
                  <FormLabel>Kode Stok</FormLabel>
                  <SelectStock
                    productId={selectedProduct}
                    defaultValue={item}
                    onValueChange={(stockId, cost) => {
                      form.setValue("stockId", stockId);
                      form.setValue("cost", cost);
                    }}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Harga Jual</FormLabel>
                  <FormControl>
                    <NumberInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter className="mt-auto flex gap-2 sm:flex-col sm:space-x-0">
              <Button className="w-full" type="submit">
                Simpan
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

export default UpdateSalesSheet;
