import { useState, useEffect } from "react";

const useSort = (initialColumn = "id", initialDirection = "desc") => {
  const [sort, setSort] = useState({
    sort: initialColumn,
    order: initialDirection,
  });

  const [sortParam, setSortParam] = useState(
    `${initialColumn} ${initialDirection}`
  );

  useEffect(() => {
    setSortParam(`${sort.sort} ${sort.order}`);
  }, [sort]);

  const updateSort = (sort: string) => {
    setSort((prev) => ({
      sort,
      order:
        prev.sort === sort ? (prev.order === "asc" ? "desc" : "asc") : "asc",
    }));
  };

  return { sort, sortParam, updateSort };
};

export default useSort;
