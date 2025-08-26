import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Excel Export Utilities
export const exportToExcel = (data: any[], filename: string) => {
  // Convert data to CSV format
  const csvContent = convertToCSV(data);

  // Create and download the file
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const convertToCSV = (data: any[]): string => {
  if (data.length === 0) return "";

  // Get headers from the first object
  const headers = Object.keys(data[0]);

  // Create CSV header row
  const csvHeaders = headers.map((header) => `"${header}"`).join(",");

  // Create CSV data rows
  const csvRows = data.map((row) =>
    headers
      .map((header) => {
        const value = row[header];
        // Handle different data types and escape quotes
        if (value === null || value === undefined) return '""';
        if (typeof value === "string") return `"${value.replace(/"/g, '""')}"`;
        if (typeof value === "object")
          return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
        return `"${value}"`;
      })
      .join(",")
  );

  // Combine headers and rows
  return [csvHeaders, ...csvRows].join("\n");
};

// Format data for specific entity types
export const formatUserDataForExport = (users: any[]) => {
  return users.map((user) => ({
    "First Name": user.firstName,
    "Last Name": user.lastName,
    Email: user.email,
    "Phone Number": user.phoneNumber || "",
    Status: user.status,
    Role: user.role,
    "Created At": user.createdAt
      ? new Date(user.createdAt).toLocaleDateString()
      : "",
  }));
};

export const formatProductDataForExport = (products: any[]) => {
  return products.map((product) => ({
    "Product Name": product.productName,
    Description: product.description || "",
    Price: `$${product.price?.toFixed(2) || "0.00"}`,
    Category: product.category?.name || "",
    SKU: product.sku || "",
    Status: product.isActive ? "Active" : "Inactive",
    "Created At": product.createdAt
      ? new Date(product.createdAt).toLocaleDateString()
      : "",
  }));
};

export const formatCategoryDataForExport = (categories: any[]) => {
  return categories.map((category) => ({
    Name: category.name,
    Description: category.description || "",
    Status: category.isActive ? "Active" : "Inactive",
    "Created At": category.createdAt
      ? new Date(category.createdAt).toLocaleDateString()
      : "",
  }));
};

export const formatOrderDataForExport = (orders: any[]) => {
  return orders.map((order) => ({
    "Customer Name": order.userFullName,
    Status: order.status,
    "Payment Method": order.paymentMethod,
    "Total Amount": `$${order.totalAmount?.toFixed(2) || "0.00"}`,
    "Order Date": order.orderDate
      ? new Date(order.orderDate).toLocaleDateString()
      : "",
    "Items Count": order.orderItems?.length || 0,
  }));
};

export const formatAuditLogDataForExport = (auditLogs: any[]) => {
  return auditLogs.map((log) => ({
    "Action Type": log.actionType,
    "Entity Name": log.entityName,
    Description: log.description,
    "IP Address": log.ipAddress,
    Timestamp: log.timestamp ? new Date(log.timestamp).toLocaleString() : "",
  }));
};
