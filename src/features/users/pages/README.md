# UserPage - Comprehensive User Management

The `UserPage` component consolidates all user management functionality into a single, comprehensive page.

## 🎯 **Features**

### **1. Dashboard Overview**

- **Stats Cards**: Total users, active users, inactive users, new users this month
- **Real-time data**: Updates automatically when users are added/edited/deleted

### **2. Advanced Filtering & Search**

- **Search**: Search by first name, last name, or email
- **Status Filter**: Filter by Active/Inactive status
- **Page Size**: Configurable pagination (10, 25, 50, 100 per page)
- **Show/Hide Inactive**: Toggle visibility of inactive users

### **3. Bulk Operations**

- **Multi-select Mode**: Select multiple users for bulk operations
- **Bulk Delete**: Delete multiple users at once
- **Bulk Export**: Export selected users (placeholder for implementation)
- **Selection Counter**: Shows number of selected users

### **4. Individual User Management**

- **Add User**: Create new user accounts
- **Edit User**: Modify existing user information
- **Delete User**: Remove individual users
- **View Details**: Access detailed user information

### **5. State Management**

- **Zustand Integration**: Uses all three user stores
  - `useUserUIStore`: Drawer states and selected user
  - `useUserSelectionStore`: Multi-select functionality
  - `useUserPreferencesStore`: Table preferences with persistence

## 🏗️ **Architecture**

```
UserPage
├── Header (Title, Actions, Bulk Operations)
├── Stats Cards (4 cards with user metrics)
├── Filters & Search Card
├── Users Table Card
└── Drawers (Add/Edit User forms)
```

## 🚀 **Usage**

The UserPage is automatically used when navigating to `/app/users` and is protected by the `RoleGuard` for Admin users only.

## 📊 **Data Flow**

1. **Load Data**: `useUsers` hook fetches user data
2. **Filter Data**: Local state filters based on search and preferences
3. **Display**: Renders filtered data in the table
4. **Actions**: User interactions trigger appropriate API calls
5. **Update**: Successful operations invalidate queries and refresh data

## 🔧 **Customization**

- **Stats Cards**: Modify metrics in the stats section
- **Filters**: Add new filter options in the filters card
- **Bulk Operations**: Implement actual bulk delete/export functionality
- **Table Columns**: Customize table columns in `UserTableColumns.tsx`
