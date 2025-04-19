"use client";

import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { ArrowUpDown } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  skeleton?: React.ReactNode;
  emptyMessage?: string;
  tableFooter?: React.ReactNode;
  footer?: React.ReactNode;
}

export const CustomHeader = ({
  column,
  label,
  onSort,
  className = "",
}: {
  column: string;
  label: string;
  onSort?: (column: string) => void;
  className?: string;
}) => {
  return (
    <div className={"flex flex-col " + className}>
      {onSort ? (
        <button
          className="mt-auto flex px-2 w-full items-center rounded-none cursor-pointer "
          onClick={() => onSort?.(column)}
        >
          {label}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      ) : (
        <div className="">{label}</div>
      )}
    </div>
  );
};

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  skeleton,
  emptyMessage,
  tableFooter,
  footer: footerAction,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    enableRowSelection: true,
    state: {
      sorting,
    },
  });

  return (
    <div className="relative overflow-hidden rounded-lg border">
      <div className="overflow-auto">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className="h-12 text-muted-foreground font-semibold"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="**:data-[slot=table-cell]:first:w-8">
            {isLoading ? (
              Array.from({ length: 10 }).map((_, index) => (
                <TableRow key={index} className="animate-pulse">
                  {columns.map((_, colIndex) => (
                    <TableCell key={colIndex}>
                      {skeleton ? (
                        skeleton
                      ) : (
                        <Skeleton className="h-5 w-full" />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  onClick={() => {
                    console.log(row.id);
                  }}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="h-12"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {emptyMessage ? emptyMessage : "No data found"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          {tableFooter && <TableFooter>{tableFooter}</TableFooter>}
        </Table>
      </div>

      {footerAction && (
        <div className="border-t w-full flex justify-center p-2 bg-background">
          {footerAction}
        </div>
      )}
    </div>
  );
}
