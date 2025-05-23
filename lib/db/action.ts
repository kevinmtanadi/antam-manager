import { asc } from "drizzle-orm";
import { db } from ".";
import { product } from "./schema";
import { Type } from "../intf";

export const getTypes = async (): Promise<Type[]> => {
  const types = await db
    .select({
      id: product.id,
      name: product.name,
    })
    .from(product)
    .orderBy(asc(product.weight));


  return types;
};