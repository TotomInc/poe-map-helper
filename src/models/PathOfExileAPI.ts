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
