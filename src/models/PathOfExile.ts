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
  /**
   * -1 is unknown, 0 is normal, 1 is magic, 2 is rare, 3 is unique
   */
  rarity: number;
  modifiers: string[];
  itemLevel: number;
  tier: number;
  iq: number;
  ir: number;
  mps: number;
}

/**
 * An item in a stash-tab.
 */
export interface POEStashItem {
  verified: boolean;
  w: number;
  h: number;
  x: number;
  y: number;
  ilvl: number;
  icon: string;
  league: string;
  id: string;
  inventoryId: string;
  name: string;
  typeLine: string;
  identified: boolean;
  descrText: string;
  frameType: number;

  category: {
    currency?: ['fossil'];
    weapons?: ['oneaxe', 'twoaxe'];
    armour?: ['helmet', 'gloves', 'chest', 'boots'];
    accessories?: ['ring', 'amulet', 'belt'];
    flasks?: [];
    gems?: ['activegem', 'supportgem'];
  };

  sockets?: {
    group: number;
    attr: string;
    sColour: string;
  }[];

  properties?: {
    name: string;
    values: [string, number][];
    displayMode: number;
    type?: number;
  }[];

  requirements?: {
    name: string;
    values: [string, number][];
    displayMode: number;
  }[];

  support?: boolean;
  secDescrText?: string;
  explicitMods?: string[];
  socketedItems?: POEStashItem[];
  stackSize?: number;
}

/**
 * Zone details where the player is actually.
 */
export interface POEMapZone {
  name: string;
  tier: number;
  unique: boolean;
}
