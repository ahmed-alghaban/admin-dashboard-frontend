# Features - Unified Architecture Patterns

This document outlines the standardized patterns used across all features in the admin dashboard.

## 🏗️ **Unified Folder Structure**

Every feature follows this consistent structure:

```
src/features/{feature}/
├── components/           # React components
│   ├── {Feature}PageHeader.tsx
│   ├── {Feature}StatsCards.tsx
│   ├── {Feature}Filters.tsx
│   ├── {Feature}Table.tsx
│   ├── {Feature}TableColumns.tsx
│   ├── {Feature}CreateForm.tsx
│   ├── {Feature}EditForm.tsx
│   ├── {Feature}Drawers.tsx
│   └── index.ts
├── hooks/               # React Query hooks
│   ├── use{Feature}s.ts
│   ├── use{Feature}Filters.ts
│   ├── useAdd{Feature}.ts
│   ├── useEdit{Feature}.ts
│   ├── useDelete{Feature}.ts
│   └── index.ts
├── pages/               # Page components
│   ├── {Feature}Page.tsx
│   └── index.ts
├── schemas/             # Zod validation schemas
│   ├── {feature}Schema.ts
│   ├── {feature}EditSchema.ts
│   └── index.ts
├── stores/              # Zustand state management
│   ├── {feature}UIStore.ts
│   ├── {feature}PreferencesStore.ts
│   ├── {feature}SelectionStore.ts
│   └── index.ts
├── {feature}Service.ts  # API service functions
├── {feature}Types.ts    # TypeScript interfaces
├── index.ts            # Feature exports
└── README.md           # Feature documentation
```

## 📋 **Naming Conventions**

### **Files & Folders**

- **Folders**: lowercase with hyphens (e.g., `user-management`)
- **Files**: PascalCase for components, camelCase for utilities
- **Schemas folder**: Always lowercase `schemas/`
- **Stores folder**: Always lowercase `stores/`

### **Components**

- **Page Components**: `{Feature}Page.tsx`
- **Header Components**: `{Feature}PageHeader.tsx`
- **Stats Components**: `{Feature}StatsCards.tsx`
- **Filter Components**: `{Feature}Filters.tsx`
- **Table Components**: `{Feature}Table.tsx`
- **Form Components**: `{Feature}CreateForm.tsx`, `{Feature}EditForm.tsx`

### **Hooks**

- **Data Hooks**: `use{Feature}s.ts`
- **Filter Hooks**: `use{Feature}Filters.ts`
- **CRUD Hooks**: `useAdd{Feature}.ts`, `useEdit{Feature}.ts`, `useDelete{Feature}.ts`

### **Stores**

- **UI Store**: `{feature}UIStore.ts`
- **Preferences Store**: `{feature}PreferencesStore.ts`
- **Selection Store**: `{feature}SelectionStore.ts`

## 🔧 **State Management Pattern**

### **Zustand Stores Structure**

Every feature uses three main stores:

1. **UI Store** - Manages UI state

   ```typescript
   interface {Feature}UIState {
     isAddDrawerOpen: boolean;
     isEditDrawerOpen: boolean;
     selected{Feature}Id: string | null;
     // Actions
     openAddDrawer: () => void;
     closeAddDrawer: () => void;
     openEditDrawer: (id: string) => void;
     closeEditDrawer: () => void;
   }
   ```

2. **Preferences Store** - Manages user preferences with persistence

   ```typescript
   interface {Feature}PreferencesState {
     pageSize: number;
     sortBy: string;
     sortOrder: "asc" | "desc";
     // Actions
     setPageSize: (size: number) => void;
     setSortBy: (field: string) => void;
     setSortOrder: (order: "asc" | "desc") => void;
   }
   ```

3. **Selection Store** - Manages multi-select functionality
   ```typescript
   interface {Feature}SelectionState {
     selected{Feature}s: Set<string>;
     isSelectMode: boolean;
     // Actions
     toggle{Feature}: (id: string) => void;
     selectAll: () => void;
     clearSelection: () => void;
   }
   ```

## 📊 **Data Fetching Pattern**

### **React Query Hooks**

Every feature uses React Query for data fetching:

```typescript
// Main data hook
export const use{Feature}s = (params?: {Feature}Filters) => {
  return useQuery({
    queryKey: ["{feature}s", params],
    queryFn: () => get{Feature}s(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Filter hook
export const use{Feature}Filters = () => {
  const [filters, setFilters] = useState({Feature}Filters);
  const { data, isLoading, error } = use{Feature}s(filters);

  return {
    {feature}s: data,
    isLoading,
    error,
    filters,
    updateFilters: setFilters,
  };
};
```

## ✅ **Validation Pattern**

### **Zod Schemas**

Every feature uses Zod for form validation:

```typescript
// Create schema
export const {feature}Schema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  // ... other fields
});

// Edit schema
export const {feature}EditSchema = {feature}Schema.partial();

// Export types
export type {Feature}Schema = z.infer<typeof {feature}Schema>;
export type {Feature}EditSchema = z.infer<typeof {feature}EditSchema>;
```

## 🎨 **Component Pattern**

### **Page Component Structure**

Every page component follows this pattern:

```typescript
const {Feature}Page = () => {
  // 1. Store hooks
  const { selected{Feature}s, clearSelection } = use{Feature}SelectionStore();
  const { closeAddDrawer, closeEditDrawer } = use{Feature}UIStore();

  // 2. Data hooks
  const { {feature}s, isLoading, error, filters, updateFilters } = use{Feature}Filters();

  // 3. Success handlers
  const handleAdd{Feature}Success = () => {
    queryClient.invalidateQueries({ queryKey: ["{feature}s"] });
    closeAddDrawer();
  };

  // 4. Loading state
  if (isLoading && !{feature}s.length) {
    return <{Feature}PageSkeleton />;
  }

  // 5. Error state
  if (error) {
    return <ErrorComponent error={error} />;
  }

  // 6. Main render
  return (
    <div className="space-y-6">
      <{Feature}PageHeader />
      <{Feature}StatsCards {feature}s={{feature}s} />
      <{Feature}Filters onFiltersChange={updateFilters} />
      <{Feature}Table {feature}s={{feature}s} />
      <{Feature}Drawers />
    </div>
  );
};
```

## 📁 **Export Pattern**

### **Index Files**

Every folder has an `index.ts` file for clean imports:

```typescript
// components/index.ts
export { default as {Feature}PageHeader } from './{Feature}PageHeader';
export { default as {Feature}StatsCards } from './{Feature}StatsCards';
export { default as {Feature}Filters } from './{Feature}Filters';
export { default as {Feature}Table } from './{Feature}Table';

// pages/index.ts
export { default as {Feature}Page } from './{Feature}Page';

// stores/index.ts
export { use{Feature}UIStore } from './{feature}UIStore';
export { use{Feature}PreferencesStore } from './{feature}PreferencesStore';
export { use{Feature}SelectionStore } from './{feature}SelectionStore';

// feature/index.ts
export { {Feature}Page } from './pages';
```

## 🚀 **Usage Examples**

### **Importing Components**

```typescript
// Clean imports using index files
import { UserPage } from "@/features/users";
import { ProductPage } from "@/features/products";
import { OrderPage } from "@/features/orders";
import { CategoryPage } from "@/features/categories";
import { DashboardPage } from "@/features/analytics";
```

### **Using Stores**

```typescript
import {
  useUserUIStore,
  useUserPreferencesStore,
} from "@/features/users/stores";

const { isAddDrawerOpen, openAddDrawer } = useUserUIStore();
const { pageSize, setPageSize } = useUserPreferencesStore();
```

### **Using Hooks**

```typescript
import { useUsers, useUserFilters } from "@/features/users/hooks";

const { users, isLoading } = useUsers();
const { filters, updateFilters } = useUserFilters();
```

## 🔄 **Migration Guide**

When adding new features or updating existing ones:

1. **Follow the folder structure** exactly as outlined above
2. **Use the naming conventions** for all files and components
3. **Implement all three stores** (UI, Preferences, Selection)
4. **Add Zod schemas** for form validation
5. **Create index.ts files** for clean exports
6. **Add comprehensive README.md** documentation
7. **Use React Query** for all data fetching
8. **Follow the component pattern** for page components

## 📚 **Feature-Specific Documentation**

Each feature has its own README.md with:

- Feature overview and capabilities
- Component descriptions
- Usage examples
- Customization options
- Performance considerations

This ensures consistency and makes the codebase maintainable and scalable.
