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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
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
import { useQuery } from "@tanstack/react-query";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { FetchStockData } from "../inventory/inventory";
import { cn, formatRupiah } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const AddSalesSheet = ({
  types,
  onSubmit: onAdd,
}: {
  types: Type[];
  onSubmit: (item: SalesItem) => void;
}) => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof addSalesItemSchema>>({
    resolver: zodResolver(addSalesItemSchema),
    defaultValues: {
      productId: "",
      stockId: "",
      price: undefined,
      cost: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof addSalesItemSchema>) {
    onAdd(values);
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kode Stok</FormLabel>
                  <SelectStock
                    productId={selectedProduct}
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
            <SheetFooter className="mt-auto flex flex-col gap-y-4">
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

const SelectStock = ({
  productId,
  onValueChange,
}: {
  productId: string;
  onValueChange: (stockId: string, cost: number) => void;
}) => {
  const { data: stocks, isPending } = useQuery<FetchStockData>({
    queryKey: ["stocks", productId],
    queryFn: async (): Promise<FetchStockData> => {
      const res = await fetch(`/api/product/stock?productId=${productId}`);

      const data = await res.json();
      return data as FetchStockData;
    },
    enabled: !!productId,
  });

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState({
    id: "",
    cost: 0,
  });

  useEffect(() => {
    if (value) {
      onValueChange(value.id, value.cost);
    }
  }, [value]);

  if (isPending && productId) return <Skeleton className="w-full h-9" />;

  if (!stocks || !stocks.stocks || stocks.stocks.length === 0)
    return <Input placeholder="Pilih produk terlebih dahulu" disabled />;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {(() => {
            const selectedStock = stocks.stocks.find(
              (stock) => stock.id === value?.id
            );
            if (value && selectedStock) {
              return (
                <div>
                  {" "}
                  <span className="font-semibold">
                    {selectedStock.id}
                  </span> - {formatRupiah(selectedStock.cost)}
                </div>
              );
            }

            return "Pilih stok";
          })()}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full sm:w-[327px] p-0">
        <Command>
          <CommandInput placeholder="Pilih item..." />
          <CommandList>
            <CommandEmpty>Item tidak ditemukan</CommandEmpty>
            <CommandGroup>
              {stocks.stocks.map((stock) => (
                <CommandItem
                  key={stock.id}
                  value={stock.id}
                  onSelect={(currentValue) => {
                    setValue(
                      currentValue === value.id
                        ? {
                            id: "",
                            cost: 0,
                          }
                        : {
                            id: currentValue,
                            cost: stock.cost,
                          }
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value.id === stock.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="font-semibold">{stock.id}</span> -{" "}
                  {formatRupiah(stock.cost)}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default AddSalesSheet;
