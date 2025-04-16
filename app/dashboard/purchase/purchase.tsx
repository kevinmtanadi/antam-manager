"use client";

import { DataTable } from "@/components/data-table";
import { DatePicker } from "@/components/datepicker";
import { formatDate } from "@/lib/utils";
import React, { useState } from "react";
import { purchaseColumns } from "./columns";
import AddPurchaseSheet from "./add-purchase-sheet";

interface PurchaseItem {
  stockId: string;
  productId: string;
  price: number;
}

interface product {
  id: string;
  name: string;
  weight: string;
}

interface PostTransaction {
  createdAt: string;
  status: string;
  items: {
    productId: string;
    stockId: string;
    price: number;
  }[];
}

const Purchase = ({ types }: { types: { id: string; name: string }[] }) => {
  const today = new Date();
  const [date, setDate] = useState<Date | undefined>(today);
  const [items, setItems] = useState<PurchaseItem[]>([]);

  const addItem = ({
    stockId,
    productId,
    price,
  }: {
    stockId: string;
    productId: string;
    price: number;
  }) => {
    setItems([
      ...items,
      {
        stockId: stockId,
        productId: productId,
        price: price,
      },
    ]);
  };

  const removeItem = (idx: number) => {
    setItems(items.filter((_, i) => i !== idx));
  };

  return (
    <div className="flex flex-col gap-8">
      <DatePicker date={date} setDate={setDate} />
      <DataTable
        data={items}
        columns={purchaseColumns}
        footer={
          <AddPurchaseSheet types={types} onSubmit={(item) => addItem(item)} />
        }
        emptyMessage="Belum ada item"
      />
    </div>
  );
};

export default Purchase;
