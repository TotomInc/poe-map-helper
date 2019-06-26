export interface POECharacter {
  ascendancyClass: number;
  class: string;
  classId: number;
  experience: number;
  league: string;
  level: number;
  name: string;
}

export interface POEMapItem {
  name: string;
  /** -1 is unknown, 0 is normal, 1 is magic, 2 is rare, 3 is unique */
  rarity: number;
  modifiers: string[];
  itemLevel: number;
  tier: number;
  iq: number;
  ir: number;
  mps: number;
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
