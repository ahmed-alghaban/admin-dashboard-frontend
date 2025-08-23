# Analytics Dashboard

A comprehensive analytics dashboard that provides real-time insights into your business performance using data from your C# backend.

## 🎯 **Features**

### **1. Dashboard Overview**

- **Stats Cards**: Total revenue, total orders, average order value, pending orders
- **Real-time data**: Updates automatically with configurable refresh intervals
- **Interactive charts**: Hover tooltips and responsive design

### **2. Advanced Filtering & Date Range Selection**

- **Timeframe Selection**: Daily, weekly, monthly views
- **Date Range Picker**: Custom start and end dates
- **Quick Filters**: Last 7, 30, 90 days, or all time
- **Validation**: Zod schema validation for all filters

### **3. Chart Components**

- **Sales Chart**: Area chart showing revenue trends with order count line
- **Top Products Chart**: Horizontal bar chart of best-performing products
- **Order Status Chart**: Pie chart showing order status distribution
- **User Growth Chart**: Line chart showing new user registrations

### **4. State Management**

- **Zustand Integration**: Uses analytics stores for state management
  - `useAnalyticsUIStore`: UI state, filters, chart selections
  - `useAnalyticsPreferencesStore`: User preferences with persistence

### **5. Performance & Caching**

- **React Query**: Intelligent caching with configurable stale times
- **Auto-refresh**: Configurable refresh intervals
- **Loading States**: Skeleton components during data fetching
- **Error Handling**: Graceful error display and recovery

## 🏗️ **Architecture**

```
AnalyticsDashboard
├── Header (Title, Description)
├── Filters Card (Date range, timeframe, quick filters)
├── Stats Cards (4 KPI cards)
├── Charts Grid (Sales, Products, Orders, Users)
└── Error Handling (Graceful error display)
```

## 🚀 **Usage**

The Analytics Dashboard is automatically used when navigating to `/app/dashboard` and is protected by the `RoleGuard` for Admin, Manager, and Viewer roles.

## 📊 **Data Flow**

1. **Load Data**: React Query hooks fetch analytics data
2. **Apply Filters**: Local state and stores manage filter state
3. **Display**: Renders filtered data in charts and cards
4. **Interactions**: User interactions update stores and trigger re-fetches
5. **Caching**: React Query provides intelligent caching and background updates

## 🔧 **Customization**

- **Chart Types**: Modify chart components in `components/`
- **Filters**: Add new filter options in `AnalyticsFilters.tsx`
- **Preferences**: Extend user preferences in `analyticsPreferencesStore.ts`
- **Validation**: Update schemas in `schemas/` folder

## Features

### 📊 Analytics Dashboard Components

1. **Analytics Stats Cards** - Key performance indicators
   - Total Revenue
   - Total Orders
   - Average Order Value
   - Pending Orders

2. **Sales Chart** - Revenue and order trends over time
   - Area chart showing revenue trends
   - Line chart showing order count
   - Supports daily, weekly, and monthly timeframes
   - Interactive tooltips with detailed information

3. **Top Products Chart** - Best performing products
   - Horizontal bar chart showing top products by revenue
   - Displays product name, revenue, and quantity sold
   - Interactive tooltips with full product details

4. **Order Status Chart** - Order status distribution
   - Pie chart showing order status breakdown
   - Color-coded status indicators
   - Percentage labels on chart segments

5. **User Growth Chart** - New user registrations
   - Line chart showing user growth over time
   - Daily user registration trends
   - Interactive data points

6. **Analytics Filters** - Date range and timeframe controls
   - Date range picker (start/end dates)
   - Timeframe selector (daily/weekly/monthly)
   - Quick filter buttons (7 days, 30 days, 90 days, all time)
   - Apply filters functionality

## API Integration

The dashboard integrates with your C# backend analytics endpoints:

- `GET /api/v1/analytics/sales-summary` - Sales data with date filtering
- `GET /api/v1/analytics/top-products` - Top performing products
- `GET /api/v1/analytics/users-growth` - User growth data
- `GET /api/v1/analytics/order-status-summary` - Order status distribution

## Usage

1. Navigate to `/app/dashboard` in your application
2. Use the filters to select date ranges and timeframes
3. View real-time analytics data in the charts and cards
4. Interact with charts for detailed information via tooltips

## Technical Details

### Dependencies

- **Recharts** - For data visualization
- **React Query** - For data fetching and caching
- **Axios** - For API communication
- **Lucide React** - For icons
- **Tailwind CSS** - For styling

### File Structure

```
src/features/analytics/
├── components/
│   ├── AnalyticsStatsCards.tsx
│   ├── SalesChart.tsx
│   ├── TopProductsChart.tsx
│   ├── OrderStatusChart.tsx
│   ├── UserGrowthChart.tsx
│   ├── AnalyticsFilters.tsx
│   └── index.ts
├── hooks/
│   └── useAnalytics.ts
├── pages/
│   └── DashboardPage.tsx
├── analyticsService.ts
├── analyticsTypes.ts
├── index.ts
└── README.md
```

### Key Features

- **Responsive Design** - Works on all screen sizes
- **Loading States** - Skeleton components during data fetching
- **Error Handling** - Graceful error display
- **Real-time Updates** - Data refreshes automatically
- **Interactive Charts** - Hover tooltips and animations
- **Date Filtering** - Flexible date range selection
- **Caching** - Optimized data fetching with React Query

## Customization

### Adding New Charts

1. Create a new chart component in `components/`
2. Add corresponding API endpoint in `analyticsService.ts`
3. Create a hook in `hooks/useAnalytics.ts`
4. Import and use in `DashboardPage.tsx`

### Styling

- Uses Tailwind CSS for consistent styling
- Follows the existing design system
- Charts use a consistent color palette
- Responsive grid layout

### Data Format

All data follows the TypeScript interfaces defined in `analyticsTypes.ts`:

- `SalesSummaryDto` - Sales data with date, amount, and order count
- `TopProductDto` - Product performance data
- `UserGrowthDto` - User registration data
- `OrderStatusSummaryDto` - Order status distribution

## Performance

- **Caching Strategy** - React Query provides intelligent caching
- **Lazy Loading** - Components load only when needed
- **Optimized Re-renders** - Minimal re-renders with proper state management
- **Bundle Size** - Tree-shaking for optimal bundle size
