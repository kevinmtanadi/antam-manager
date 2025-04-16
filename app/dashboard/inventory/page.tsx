import { getTypes } from "@/lib/db/action";
import Inventory from "./inventory";
import { unstable_cache } from "next/cache";

const getCachedTypes = unstable_cache(
  async () => {
    const types = await getTypes();
    types.unshift({ id: "all", name: "Semua" });

    return types;
  },
  ["types", "inventory"],
  {
    revalidate: 86400,
    tags: ["types", "inventory"],
  }
);

export default async function InventoryWrapper() {
  const types = await getCachedTypes();

  return <Inventory types={types} />;
}
