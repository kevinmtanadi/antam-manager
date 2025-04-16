import { getTypes } from "@/lib/db/action";
import { unstable_cache } from "next/cache";
import Purchase from "./purchase";

const getCachedTypes = unstable_cache(
  async () => {
    return await getTypes();
  },
  ["types", "purchase"],
  {
    revalidate: 86400,
    tags: ["types", "purchase"],
  }
);

export default async function PurchaseWrapper() {
  const types = await getCachedTypes();

  return <Purchase types={types} />;
}
