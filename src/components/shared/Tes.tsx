import type { ColumnDef } from "@tanstack/react-table";

export type ProductRow = {
    productId: string;
    productName: string;
    sku: string;
    price: number;
    status: "Active" | "Draft" | "Archived";
};

export const productColumns: ColumnDef<ProductRow>[] = [
    { accessorKey: "productName", header: "Name" },
    { accessorKey: "sku", header: "SKU" },
    {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => `SAR ${row.original.price.toFixed(2)}`,
    },
    { accessorKey: "status", header: "Status" },
];