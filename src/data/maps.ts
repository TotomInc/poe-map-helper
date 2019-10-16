import { POEMapHistory, POEMapItem, POEPricedStashItem } from '@/models/PathOfExile';
import { maps } from '../consts/zones';
import { randomStashOrbItem } from './items';

/**
 * Generate a random map from a valid list of existing maps in the game.
 */
export function randomMap(): POEMapItem {
  const randomMapIndex = Math.floor(Math.random() * maps.length);
  const randomMap = maps[randomMapIndex];

  return {
    name: randomMap.name,
    modifiers: [],
    rarity: Math.floor(Math.random() * 3),
    itemLevel: Math.floor(Math.random() * 100),
    tier: Math.floor(Math.random() * 16),
    iq: Math.floor(Math.random() * 100),
    ir: Math.floor(Math.random() * 150),
    mps: Math.floor(Math.random() * 50),
  };
}

/**
 * Generate a random `POEMapHistory` with realistic map and items.
 */
export function randomMapHistory(): POEMapHistory {
  const map = randomMap();

  const stashOrbItems = new Array(10).map(() => randomStashOrbItem());

  const pricedStashOrbItems: POEPricedStashItem[] = stashOrbItems.map((item) => ({
    ...item,
    chaos: Math.floor(Math.random() * 300),
    exalt: Math.floor(Math.random() * 2),
  } as POEPricedStashItem));

  return {
    map,
    items: pricedStashOrbItems,
    startTime: Date.now(),
    endTime: Date.now() - 60000,
    income: {
      chaos: Math.floor(Math.random() * 1000),
      exalt: Math.floor(Math.random() * 7),
    },
  };
}
