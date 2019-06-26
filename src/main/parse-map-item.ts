import { POEMapItem } from '@/models/PathOfExile';

/**
 * Detect if the content in the clipboard is a map item, by checking if it
 * contains the `Travel to this Map by using it...` description at the end.
 *
 * @param details full description of a potential map item
 */
export function isMapItem(details: string): boolean {
  return details.indexOf('Travel to this Map by using it') > -1;
}

/**
 * Returns a rarity index where:
 * - `-1` is unknown
 * - `0` is normal
 * - `1` is magic
 * - `2` is rare
 * - `3` is unique
 *
 * @param details splitted lines from the map item
 */
export function extractMapRarity(details: string[]): number {
  const rarityLine = details.find((detail) => detail.indexOf('Rarity:') > -1)!;
  const rarity = rarityLine.substr('Rarity: '.length, rarityLine.length);

  let rarityIndex = -1;

  if (rarity === 'Normal') {
    rarityIndex = 0;
  } else if (rarity === 'Magic') {
    rarityIndex = 1;
  } else if (rarity === 'Rare') {
    rarityIndex = 2;
  } else if (rarity === 'Unique') {
    rarityIndex = 3;
  }

  return rarityIndex;
}

/**
 * Extract the name of the map (doesn't include the suffix + prefix).
 *
 * @param details splitted lines from the map item
 */
export function extractMapName(details: string[]): string {
  const separatorIndex = details.indexOf('--------');

  // The name of the map is always before the first separator
  const mapName = details[separatorIndex - 1];

  return mapName;
}

/**
 * Extract basic map data such as item level, map tier, item quantity, item
 * rarity, monster pack size.
 *
 * @param details splitted lines from the map item
 */
export function extractMapData(details: string[]) {
  const itemLevelLine = details.find((detail) => detail.includes('Item Level:'));
  const itemLevel = itemLevelLine ? itemLevelLine.substr('Item Level: '.length, itemLevelLine.length) : '0';

  const mapTierLine = details.find((detail) => detail.includes('Map Tier:'));
  const mapTier = mapTierLine ? mapTierLine.substr('Map Tier: '.length, mapTierLine.length) : '0';

  const iqLine = details.find((detail) => detail.includes('Item Quantity:'));
  const iq = iqLine ? iqLine.substring(iqLine.indexOf('+') + 1, iqLine.indexOf('%')) : '0';

  const irLine = details.find((detail) => detail.includes('Item Rarity:'));
  const ir = irLine ? irLine.substring(irLine.indexOf('+') + 1, irLine.indexOf('%')) : '0';

  const mpsLine = details.find((detail) => detail.includes('Monster Pack Size:'));
  const mps = mpsLine ? mpsLine.substring(mpsLine.indexOf('+') + 1, mpsLine.indexOf('%')) : '0';

  return {
    itemLevel: parseInt(itemLevel, 10),
    tier: parseInt(mapTier, 10),
    iq: parseInt(iq, 10),
    ir: parseInt(ir, 10),
    mps: parseInt(mps, 10)
  };
}

/**
 * Extract the modifiers applied on this map. If a white map, array will be
 * empty.
 *
 * @param details splitted lines from the map item
 */
export function extractMapModifiers(details: string[]): string[] {
  let modifiers: string[] = [];

  // The separator before the modifiers is the one after the Item Level line
  let itemLevelSeparatorIndex = details.findIndex((detail) => detail.includes('Item Level:'));
  itemLevelSeparatorIndex = itemLevelSeparatorIndex ? itemLevelSeparatorIndex + 2 : -1;

  // The separator closing the map modifiers is the one before the map description
  let mapDescSeparatorIndex = details.findIndex((detail) => detail.includes('Travel to this Map'));
  mapDescSeparatorIndex = mapDescSeparatorIndex ? mapDescSeparatorIndex - 2 : -1;

  // Slice the correct part contaning all the map mods
  modifiers = details.slice(itemLevelSeparatorIndex, mapDescSeparatorIndex);

  return modifiers;
}

/**
 * Parse a map item, copied into the clipboard from the game.
 *
 * @param mapItem full description of the map item
 */
export function parseMapItem(mapItem: string): POEMapItem {
  const mapDetails = mapItem.split('\n');

  const mapName = extractMapName(mapDetails);
  const mapRarity = extractMapRarity(mapDetails);
  const mapData = extractMapData(mapDetails);
  const mapModifiers = extractMapModifiers(mapDetails);

  return {
    ...mapData,
    name: mapName,
    rarity: mapRarity,
    modifiers: mapModifiers
  };
}
