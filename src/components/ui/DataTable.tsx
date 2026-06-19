import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { EmptyState } from "./EmptyState";
import { LoadingState } from "./LoadingState";

export interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (row: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
}

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  isLoading = false,
  emptyMessage,
  onRowClick,
}: DataTableProps<T>) {
  const { t } = useLanguage();

  if (isLoading) {
    return <LoadingState rows={5} />;
  }

  if (data.length === 0) {
    return <EmptyState message={emptyMessage || t("admin.common.noData")} />;
  }

  return (
    <div className="w-full overflow-x-auto border border-brand-border rounded-xl bg-white shadow-xs">
      <table className="w-full text-sm text-start text-brand-dark">
        <thead className="text-xs uppercase bg-brand-bg text-brand-muted border-b border-brand-border">
          <tr>
            {columns.map((column, idx) => (
              <th
                key={idx}
                scope="col"
                className="px-6 py-4 font-semibold text-brand-dark"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-brand-border">
          {data.map((row) => (
            <tr
              key={row.id}
              onClick={() => onRowClick && onRowClick(row)}
              className={`bg-white transition-colors duration-150 ${
                onRowClick ? "hover:bg-brand-bg/50 cursor-pointer" : "hover:bg-brand-bg/20"
              }`}
            >
              {columns.map((column, colIdx) => (
                <td key={colIdx} className="px-6 py-4 font-medium whitespace-nowrap">
                  {column.cell
                    ? column.cell(row)
                    : column.accessorKey
                    ? (row[column.accessorKey] as React.ReactNode)
                    : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
