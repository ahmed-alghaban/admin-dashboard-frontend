import * as React from "react"
import {
    getCoreRowModel,
    getSortedRowModel,
    type ColumnDef,
    type SortingState,
    useReactTable as useTanstackReactTable,
} from "@tanstack/react-table"

export type UseReactTableParams<TData, TValue> = {
    data: TData[]
    columns: ColumnDef<TData, TValue>[]
    manualSorting?: boolean
    sorting?: SortingState
    onSortingChange?: (sorting: SortingState) => void
    manualPagination?: boolean
}

export function useReactTable<TData, TValue>({
    data,
    columns,
    manualSorting = true,
    sorting = [],
    onSortingChange,
    manualPagination = true,
}: UseReactTableParams<TData, TValue>) {
    const [internalSorting, setInternalSorting] = React.useState<SortingState>(sorting)

    React.useEffect(() => {
        setInternalSorting(sorting)
    }, [sorting])

    const table = useTanstackReactTable({
        data,
        columns,
        state: { sorting: manualSorting ? internalSorting : undefined },
        onSortingChange: (updater) => {
            const next = typeof updater === "function" ? updater(internalSorting) : updater
            setInternalSorting(next)
            onSortingChange?.(next)
        },
        manualSorting,
        manualPagination,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: manualSorting ? undefined : getSortedRowModel(),
    })

    return { table, sorting: internalSorting, setSorting: setInternalSorting }
}