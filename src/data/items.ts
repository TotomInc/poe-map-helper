import { POEStashItem } from '@/models/PathOfExile';

const orbs = [
  {
    name: 'Chaos Orb',
    icon: 'https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollRare.png',
  },
  {
    name: 'Orb of Regret',
    icon: 'https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyPassiveSkillRefund.png',
  },
  {
    name: "Cartographer's Chisel",
    icon: 'https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyMapQuality.png',
  },
  {
    name: "Jeweller's Orb",
    icon: 'https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollSocketNumbers.png',
  },
  {
    name: 'Regal Orb',
    icon: 'https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyUpgradeMagicToRare.png',
  },
  {
    name: 'Divine Orb',
    icon: 'https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyModValues.png',
  },
  {
    name: 'Orb of Scouring',
    icon: 'https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyConvertToNormal.png',
  },
  {
    name: 'Chromatic Orb',
    icon: 'https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollSocketColours.png',
  },
];

/**
 * Generate a random currency-orb as a `POEStashItem`.
 *
 * @param league name of the league
 */
export function randomStashOrbItem(league: string = 'Standard'): POEStashItem {
  const randomOrbIndex = Math.floor(Math.random() * orbs.length);
  const randomOrb = orbs[randomOrbIndex];

  return {
    league,

    typeLine: 'currency',
    verified: false,
    identified: true,
    frameType: 5,

    w: 1,
    h: 1,
    x: Math.floor(Math.random() * 50),
    y: Math.floor(Math.random() * 50),

    ilvl: Math.floor(Math.random() * 100),

    icon: randomOrb.icon,
    name: randomOrb.name,
    descrText: randomOrb.name,

    id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10),
    inventoryId: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10),

    category: {},
  };
}
