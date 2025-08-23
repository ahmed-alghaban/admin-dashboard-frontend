import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AnalyticsPreferencesState {
  // Display preferences
  defaultTimeframe: string;
  defaultDateRange: number; // days
  chartRefreshInterval: number; // minutes
  showDataLabels: boolean;
  showGridLines: boolean;

  // Performance preferences
  autoRefresh: boolean;
  cacheTimeout: number; // minutes

  // Actions
  setDefaultTimeframe: (timeframe: string) => void;
  setDefaultDateRange: (days: number) => void;
  setChartRefreshInterval: (minutes: number) => void;
  toggleDataLabels: () => void;
  toggleGridLines: () => void;
  setAutoRefresh: (enabled: boolean) => void;
  setCacheTimeout: (minutes: number) => void;
  resetPreferences: () => void;
}

const defaultPreferences = {
  defaultTimeframe: "daily",
  defaultDateRange: 30,
  chartRefreshInterval: 5,
  showDataLabels: true,
  showGridLines: true,
  autoRefresh: true,
  cacheTimeout: 10,
};

export const useAnalyticsPreferencesStore = create<AnalyticsPreferencesState>()(
  persist(
    (set) => ({
      ...defaultPreferences,

      setDefaultTimeframe: (timeframe: string) =>
        set({ defaultTimeframe: timeframe }),

      setDefaultDateRange: (days: number) => set({ defaultDateRange: days }),

      setChartRefreshInterval: (minutes: number) =>
        set({ chartRefreshInterval: minutes }),

      toggleDataLabels: () =>
        set((state) => ({ showDataLabels: !state.showDataLabels })),

      toggleGridLines: () =>
        set((state) => ({ showGridLines: !state.showGridLines })),

      setAutoRefresh: (enabled: boolean) => set({ autoRefresh: enabled }),

      setCacheTimeout: (minutes: number) => set({ cacheTimeout: minutes }),

      resetPreferences: () => set(defaultPreferences),
    }),
    {
      name: "analytics-preferences",
      version: 1,
    }
  )
);
