import type { Category } from "../categories/categoryTypes";
import type { ProductCreateFormData } from "./schemas/productSchema";

// Product Create DTO
export interface ProductCreateDto {
  productName: string;
  description: string;
  sku: string;
  price: number;
  quantityInStock: number;
  categoryId: string; // Guid maps to string
  imageUrl?: string;
}

// Product DTO (response from API)
export interface Product {
  productId: string; // Guid maps to string
  productName: string;
  description: string;
  sku: string;
  price: number;
  quantityInStock: number;
  categoryId: string; // Guid maps to string
  category?: Category;
  imageUrl?: string;
  isActive: boolean;
}

// Product Update DTO
export interface ProductUpdateDto {
  productName?: string;
  description?: string;
  sku?: string;
  price: number;
  categoryId: string; // Guid maps to string
  imageUrl?: string;
}

// Default values for product creation form
export const defaultValues: ProductCreateFormData = {
  productName: "",
  description: "",
  sku: "",
  price: 0,
  quantityInStock: 0,
  categoryId: "",
  imageUrl: "",
};
