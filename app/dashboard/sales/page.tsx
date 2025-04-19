import { getTypes } from "@/lib/db/action";
import { unstable_cache } from "next/cache";
import Sales from "./sales";

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

export default async function SalesWrapper() {
  const types = await getCachedTypes();

  return <Sales types={types} />;
}
