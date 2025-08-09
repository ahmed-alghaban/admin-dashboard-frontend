import * as React from "react";
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    type SortingState,
    useReactTable,
} from "@tanstack/react-table";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table/table";
import { cn } from "@/lib/utils";
import type { DataTableProps } from "@/lib/types";

export const DataTable = <TData, TValue>({
    columns,
    data,
    loading = false,
    emptyMessage = "No results.",
    manualSorting = true,
    sorting = [],
    onSortingChange,
    manualPagination = true,
    page = 1,
    pageSize = 10,
    total = 0,
    onPageChange,
    className,
}: DataTableProps<TData, TValue>) => {
    const [internalSorting, setInternalSorting] = React.useState<SortingState>(sorting);

    // keep controlled if provided
    React.useEffect(() => {
        setInternalSorting(sorting);
    }, []);

    const table = useReactTable({
        data,
        columns,
        state: { sorting: manualSorting ? internalSorting : undefined },
        onSortingChange: (updater) => {
            const next = typeof updater === "function" ? updater(internalSorting) : updater;
            setInternalSorting(next);
            onSortingChange?.(next);
        },
        manualSorting,
        manualPagination,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: manualSorting ? undefined : getSortedRowModel(),
    });

    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    return (
        <div className={cn("rounded-2xl border", className)}>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((hg) => (
                        <TableRow key={hg.id}>
                            {hg.headers.map((header) => {
                                const canSort = header.column.getCanSort();
                                const sortDir = header.column.getIsSorted() as false | "asc" | "desc";
                                return (
                                    <TableHead key={header.id}>
                                        {canSort ? (
                                            <button
                                                type="button"
                                                className="flex items-center gap-1 select-none"
                                                onClick={header.column.getToggleSortingHandler()}
                                            >
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                <span className="text-xs text-muted-foreground">
                                                    {sortDir === "asc" ? "▲" : sortDir === "desc" ? "▼" : ""}
                                                </span>
                                            </button>
                                        ) : (
                                            flexRender(header.column.columnDef.header, header.getContext())
                                        )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>

                <TableBody>
                    {loading ? (
                        // loading skeleton rows
                        [...Array(5)].map((_, i) => (
                            <TableRow key={`sk-${i}`}>
                                {columns.map((_, j) => (
                                    <TableCell key={`sk-${i}-${j}`}>
                                        <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center text-sm text-muted-foreground">
                                {emptyMessage}
                            </TableCell>
                        </TableRow>
                    ) : (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            {/* Pagination footer (server-side friendly) */}
            {manualPagination && (
                <div className="flex items-center justify-between px-3 py-2">
                    <span className="text-sm text-muted-foreground">
                        Page {page} / {totalPages}
                    </span>
                    <div className="flex items-center gap-2">
                        <button
                            className="px-2 py-1 text-sm rounded border disabled:opacity-50"
                            disabled={page <= 1}
                            onClick={() => onPageChange?.(page - 1)}
                        >
                            Prev
                        </button>
                        <button
                            className="px-2 py-1 text-sm rounded border disabled:opacity-50"
                            disabled={page >= totalPages}
                            onClick={() => onPageChange?.(page + 1)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
