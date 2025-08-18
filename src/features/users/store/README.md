# Users Feature - Zustand Stores

This directory contains Zustand stores for managing state in the users feature.

## Stores Overview

### 1. `userUIStore` - UI State Management

Manages drawer states and selected user for editing.

**Usage:**

```typescript
import { useUserUIStore } from "../store/userUIStore";

const {
  isAddDrawerOpen,
  isEditDrawerOpen,
  selectedUserId,
  openAddDrawer,
  closeAddDrawer,
  openEditDrawer,
  closeEditDrawer,
} = useUserUIStore();
```

### 2. `userSelectionStore` - User Selection State

Manages multi-select functionality for bulk operations.

**Usage:**

```typescript
import { useUserSelectionStore } from "../store/userSelectionStore";

const {
  selectedUsers,
  isSelectMode,
  toggleUser,
  selectAll,
  clearSelection,
  getSelectedCount,
} = useUserSelectionStore();
```

### 3. `userPreferencesStore` - User Preferences

Manages table preferences like sorting, filters, and pagination with persistence.

**Usage:**

```typescript
import { useUserPreferencesStore } from "../store/userPreferencesStore";

const {
  tableSort,
  tableFilters,
  pageSize,
  updateSort,
  updateFilters,
  setPageSize,
} = useUserPreferencesStore();
```

## Benefits of Using Zustand

1. **Centralized State**: All UI state in one place
2. **Type Safety**: Full TypeScript support
3. **Persistence**: Automatic localStorage persistence for preferences
4. **Performance**: Minimal re-renders with selective subscriptions
5. **Developer Experience**: Simple API, easy debugging

## Migration from useState

**Before (useState):**

```typescript
const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
```

**After (Zustand):**

```typescript
const {
  isAddDrawerOpen,
  isEditDrawerOpen,
  selectedUserId,
  openAddDrawer,
  closeAddDrawer,
  openEditDrawer,
  closeEditDrawer,
} = useUserUIStore();
```

## Future Enhancements

- Bulk delete functionality using `userSelectionStore`
- Advanced filtering using `userPreferencesStore`
- Export selected users
- Batch role assignment
