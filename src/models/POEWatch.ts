/**
 * Compact data used in `/get` request of `poe.watch` API
 */
export interface POEWatchItemCompact {
  id: number;
  mean: number;
  median: number;
  mode: number;
  min: number;
  max: number;
  exalted: number;
  total: number;
  daily: number;
  current: number;
  accepted: number;
}

/**
 * Item data used in `/get` request of `poe.watch` API
 */
export interface POEWatchItemData {
  id: number;
  name: string;
  category: string;
  group: string;
  frame: number;
  icon: string;
}

/**
 * Model for a `currency` item from `poe.watch` API
 */
export interface POEWatchCurrency extends POEWatchItemData, POEWatchItemCompact {
  history: number[];
  stackSize: number;
}
