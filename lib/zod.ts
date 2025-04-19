import { z } from "zod";

export const createProductSchema = z.object({
  id: z
    .string()
    .min(1, "Kode produk harus diisi")
    .max(31, "Kode produk tidak boleh melebihi 31 karakter"),
  name: z
    .string()
    .min(1, "Nama produk harus diisi")
    .max(63, "Nama produk tidak boleh melebihi 63 karakter"),
  weight: z
    .union([z.string(), z.number()])
    .refine((val) => val !== "", "Berat produk harus diisi") // Ensure it's not empty
    .transform((val) => Number(val)),
});

export const addPurchaseItemSchema = z.object({
  stockId: z
    .string()
    .min(1, "Kode produk harus diisi")
    .max(31, "Kode produk tidak boleh melebihi 31 karakter"),
  productId: z.string().min(1, "Jenis produk harus dipilih"),
  price: z
    .union([z.string(), z.number()])
    .refine((val) => val !== "", "Berat produk harus diisi") // Ensure it's not empty
    .transform((val) => Number(val)),
});

export const addSalesItemSchema = z.object({
  stockId: z
    .string()
    .min(1, "Kode produk harus diisi")
    .max(31, "Kode produk tidak boleh melebihi 31 karakter"),
  productId: z.string().min(1, "Jenis produk harus dipilih"),
  price: z
  .union([z.string(), z.number()])
  .refine((val) => val !== "", "Berat produk harus diisi") // Ensure it's not empty
  .transform((val) => Number(val)),
  cost: z
  .union([z.string(), z.number()])
  .refine((val) => val !== "") // Ensure it's not empty
  .transform((val) => Number(val)),
});