import { POEMapHistory, POEMapItem, POEPricedStashItem } from '@/models/PathOfExile';
import { randomStashOrbItem } from './items';
import { maps } from '../consts/zones';

/**
 * Generate a random map from a valid list of existing maps in the game.
 */
export function randomMap(): POEMapItem {
  const randomMapIndex = Math.floor(Math.random() * maps.length);
  const map = maps[randomMapIndex];

  return {
    name: map.name,
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
 * Generate a random `POEMapHistory` with realistic random map and items.
 */
export function randomMapHistory(): POEMapHistory {
  const map = randomMap();

  const amountOfItems = Math.floor(Math.random() * 5);

  const stashOrbItems: POEPricedStashItem[] = [...Array(amountOfItems)]
    .map(() => randomStashOrbItem())
    .map(
      (item) =>
        ({
          ...item,
          chaos: Math.floor(Math.random() * 300),
          exalt: Math.floor(Math.random() * 2),
        } as POEPricedStashItem),
    );

  return {
    map,
    items: stashOrbItems,
    startTime: Date.now(),
    endTime: Date.now() - 60000,
    income: {
      chaos: Math.floor(Math.random() * 1000),
      exalt: Math.floor(Math.random() * 7),
    },
  };
}

/**
 * Generate the amount needed of `POEMapHistory`.
 *
 * @param length amount of `POEMapHistory` to generate
 */
export function randomMapsHistory(length: number = 50): POEMapHistory[] {
  return [...Array(length)].map(() => randomMapHistory());
}
