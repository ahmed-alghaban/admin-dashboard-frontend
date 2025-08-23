import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  AnalyticsStatsCards,
  SalesChart,
  TopProductsChart,
  OrderStatusChart,
  UserGrowthChart,
  AnalyticsFilters,
} from "../components";
import {
  useSalesSummary,
  useTopProducts,
  useUserGrowth,
  useOrderStatusSummary,
} from "../hooks/useAnalytics";
import { useAnalyticsUIStore, useAnalyticsPreferencesStore } from "../stores";

const DashboardPage = () => {
  // Get stores
  const { selectedTimeframe, setTimeframe, setDateRange } =
    useAnalyticsUIStore();

  const { defaultTimeframe } = useAnalyticsPreferencesStore();

  const [filters, setFilters] = useState({
    startDate: undefined as string | undefined,
    endDate: undefined as string | undefined,
    timeframe: selectedTimeframe,
  });

  // Initialize with preferences
  useEffect(() => {
    if (defaultTimeframe && defaultTimeframe !== selectedTimeframe) {
      setTimeframe(defaultTimeframe);
      setFilters((prev) => ({ ...prev, timeframe: defaultTimeframe }));
    }
  }, [defaultTimeframe, selectedTimeframe, setTimeframe]);

  // Fetch analytics data
  const {
    data: salesData = [],
    isLoading: salesLoading,
    error: salesError,
  } = useSalesSummary(filters.startDate, filters.endDate, filters.timeframe);

  const {
    data: topProductsData = [],
    isLoading: topProductsLoading,
    error: topProductsError,
  } = useTopProducts(5, "revenue");

  const {
    data: userGrowthData = [],
    isLoading: userGrowthLoading,
    error: userGrowthError,
  } = useUserGrowth(30, "count");

  const {
    data: orderStatusData = [],
    isLoading: orderStatusLoading,
    error: orderStatusError,
  } = useOrderStatusSummary();

  const handleFiltersChange = (newFilters: {
    startDate?: string;
    endDate?: string;
    timeframe: string;
  }) => {
    setFilters({
      startDate: newFilters.startDate,
      endDate: newFilters.endDate,
      timeframe: newFilters.timeframe,
    });

    // Update stores
    setTimeframe(newFilters.timeframe);
    setDateRange(newFilters.startDate, newFilters.endDate);
  };

  const isLoading =
    salesLoading ||
    topProductsLoading ||
    userGrowthLoading ||
    orderStatusLoading;

  return (
    <>
      <Helmet>
        <title>Analytics Dashboard | Admin Dashboard</title>
        <meta
          name="description"
          content="Comprehensive analytics and insights for your business"
        />
      </Helmet>

      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
            Analytics Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Get real-time insights into your business performance and trends
          </p>
        </div>

        {/* Filters */}
        <AnalyticsFilters
          onFiltersChange={handleFiltersChange}
          isLoading={isLoading}
        />

        {/* Stats Cards */}
        <AnalyticsStatsCards
          salesData={salesData}
          orderStatusData={orderStatusData}
          userGrowthData={userGrowthData}
          isLoading={isLoading}
        />

        {/* Charts Grid */}
        <div className="grid gap-6">
          {/* Sales Chart - Full Width */}
          <SalesChart
            data={salesData}
            isLoading={salesLoading}
            timeframe={filters.timeframe}
          />

          {/* Top Products and Order Status Charts */}
          <div className="grid gap-6 md:grid-cols-2">
            <TopProductsChart
              data={topProductsData}
              isLoading={topProductsLoading}
            />
            <OrderStatusChart
              data={orderStatusData}
              isLoading={orderStatusLoading}
            />
          </div>
        </div>

        {/* User Growth Chart - Full Width */}
        <UserGrowthChart data={userGrowthData} isLoading={userGrowthLoading} />

        {/* Error Handling */}
        {(salesError ||
          topProductsError ||
          userGrowthError ||
          orderStatusError) && (
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-destructive" />
              <p className="text-sm font-medium text-destructive">
                Some data failed to load. Please try refreshing the page.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardPage;
