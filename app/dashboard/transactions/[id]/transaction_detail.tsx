import { DataTable } from "@/components/data-table";
import TransactionStatusBadge from "@/components/transaction-status-badge";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import { transactionItemColumns } from "./columns";
import { formatDate, formatRupiah } from "@/lib/utils";

const TransactionDetail = ({ transaction }: { transaction: any }) => {
  return (
    <div className="flex flex-col gap-8">
      <h4 className="font-semibold text-xl">Detail Transaksi</h4>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="w-1/2">Kode Transaksi</TableCell>
            <TableCell className="w-1/2 font-semibold">
              {transaction.transaction.id}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/2">Jenis Transaksi</TableCell>
            <TableCell className="w-1/2">
              <TransactionStatusBadge status={transaction.transaction.status} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/2">Tanggal Transaksi</TableCell>
            <TableCell className="w-1/2">
              {formatDate(transaction.transaction.createdAt, "dd month yyyy")}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/2">Profit</TableCell>
            <TableCell className="w-1/2 font-semibold">
              {formatRupiah(transaction.transaction.profit)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <h4 className="font-semibold text-xl">Item Transaksi</h4>
      <DataTable
        data={transaction.items}
        columns={transactionItemColumns}
        tableFooter={
          <TableRow className="font-semibold">
            <TableCell className="text-end" colSpan={2}>
              TOTAL
            </TableCell>
            <TableCell>
              <div className="text-end me-5">
                {formatRupiah(transaction.transaction.totalPrice)}
              </div>
            </TableCell>
          </TableRow>
        }
      />
    </div>
  );
};

export default TransactionDetail;
