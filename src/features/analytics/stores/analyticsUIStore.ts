import { create } from "zustand";

interface AnalyticsUIState {
  // Filter states
  isFiltersExpanded: boolean;
  selectedTimeframe: string;
  selectedDateRange: {
    startDate?: string;
    endDate?: string;
  };

  // Chart states
  selectedCharts: string[];
  chartLayout: "grid" | "list";

  // Actions
  toggleFiltersExpanded: () => void;
  setTimeframe: (timeframe: string) => void;
  setDateRange: (startDate?: string, endDate?: string) => void;
  toggleChart: (chartId: string) => void;
  setChartLayout: (layout: "grid" | "list") => void;
  resetUI: () => void;
}

export const useAnalyticsUIStore = create<AnalyticsUIState>((set) => ({
  // Initial state
  isFiltersExpanded: false,
  selectedTimeframe: "daily",
  selectedDateRange: {},
  selectedCharts: ["sales", "products", "orders", "users"],
  chartLayout: "grid",

  // Actions
  toggleFiltersExpanded: () =>
    set((state) => ({ isFiltersExpanded: !state.isFiltersExpanded })),

  setTimeframe: (timeframe: string) => set({ selectedTimeframe: timeframe }),

  setDateRange: (startDate?: string, endDate?: string) =>
    set({ selectedDateRange: { startDate, endDate } }),

  toggleChart: (chartId: string) =>
    set((state) => ({
      selectedCharts: state.selectedCharts.includes(chartId)
        ? state.selectedCharts.filter((id) => id !== chartId)
        : [...state.selectedCharts, chartId],
    })),

  setChartLayout: (layout: "grid" | "list") => set({ chartLayout: layout }),

  resetUI: () =>
    set({
      isFiltersExpanded: false,
      selectedTimeframe: "daily",
      selectedDateRange: {},
      selectedCharts: ["sales", "products", "orders", "users"],
      chartLayout: "grid",
    }),
}));
