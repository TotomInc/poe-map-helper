export interface POECharacter {
  ascendancyClass: number;
  class: string;
  classId: number;
  experience: number;
  league: string;
  level: number;
  name: string;
}

export interface POELeague {
  id: number;
  name: string;
  display?: string;
  hardcore: boolean;
  upcoming: boolean;
  active: boolean;
  event: boolean;
  challenge: boolean;
  start?: Date;
  end?: Date;
}

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
  frame: string;
  icon: string;
}

/**
 * Model for a `currency` item from `poe.watch` API
 */
export interface POEWatchCurrency extends POEWatchItemData, POEWatchItemCompact {
  history: number[];
  stackSize: number;
}
