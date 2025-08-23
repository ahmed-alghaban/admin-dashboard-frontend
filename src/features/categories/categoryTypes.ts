// Category DTO (response from API)
export interface Category {
  categoryId: string; // Guid maps to string
  name: string;
  description: string;
}

// Category Create DTO
export interface CategoryCreateDto {
  name: string;
  description: string;
}

// Category Update DTO
export interface CategoryUpdateDto {
  name?: string;
  description?: string;
}
