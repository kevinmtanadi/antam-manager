import React, { Suspense } from "react";
import TransactionDetail from "./transaction_detail";

const fetchTransactionDetail = async (id: string) => {
  const res = await fetch(process.env.BASE_URL + "/api/transaction/" + id);

  return res.json();
};

const page = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  const transactionDetail = await fetchTransactionDetail(id);

  if (!transactionDetail) return <>Not found</>;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TransactionDetail transaction={transactionDetail} />
    </Suspense>
  );
};

export default page;
