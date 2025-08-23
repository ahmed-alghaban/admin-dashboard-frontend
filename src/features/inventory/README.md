# Inventory Feature

This feature provides inventory management functionality for the admin dashboard.

## Overview

The inventory feature allows users to:

- View all inventory items with pagination
- See inventory statistics (total items, low stock, out of stock, normal stock)
- Update inventory quantities (Admin/Manager roles only)
- Filter inventory by stock levels
- Export inventory data (placeholder functionality)

## API Endpoints

The feature integrates with the following C# backend endpoints:

- `GET /api/v1/inventory` - Get all inventories with pagination
- `PUT /api/v1/inventory/{id}` - Update inventory quantity (Admin/Manager roles only)

## Components

### Core Components

- `InventoryPage` - Main page component
- `InventoryStatsCards` - Statistics display cards
- `InventoriesTable` - Data table with inventory items
- `InventoryEditForm` - Form for updating inventory quantities
- `InventoryDrawers` - Side drawer for edit forms

### Hooks

- `useInventories` - Fetch inventory data
- `useUpdateInventory` - Update inventory quantity mutation
- `useInventoryFilters` - Filter and pagination logic

### Stores

- `useInventoryUIStore` - UI state management
- `useInventoryPreferencesStore` - User preferences with persistence
- `useInventorySelectionStore` - Multi-select functionality

## Data Structure

The inventory data structure matches the C# DTO:

```typescript
interface Inventory {
  inventoryId: string;
  productId: string;
  quantityAvailable: number;
  reorderLevel: number;
  lastRestockedAt?: string;
}
```

## Features

### Stock Level Indicators

- **Normal Stock**: Quantity > reorder level
- **Low Stock**: Quantity ≤ reorder level but > 0
- **Out of Stock**: Quantity = 0

### Role-Based Access

- **Viewer**: Can view inventory data
- **Manager**: Can view and update inventory quantities
- **Admin**: Can view and update inventory quantities

### Statistics

- Total inventory items
- Low stock items count
- Out of stock items count
- Normal stock items count

## Usage

The inventory feature is accessible via the sidebar navigation and is protected by role-based access control. Users with appropriate permissions can:

1. Navigate to the Inventory page
2. View inventory statistics and data
3. Click on action buttons to update quantities
4. Use the refresh button to reload data
5. Export selected inventory items (placeholder)

## Future Enhancements

- Add inventory creation functionality
- Implement bulk quantity updates
- Add inventory history tracking
- Integrate with product details
- Add inventory alerts and notifications
