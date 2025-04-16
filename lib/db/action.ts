import { asc } from "drizzle-orm";
import { db } from ".";
import { product } from "./schema";

export const getTypes = async () => {
  const types = await db
    .select({
      id: product.id,
      name: product.name,
    })
    .from(product)
    .orderBy(asc(product.weight));


  return types;
};