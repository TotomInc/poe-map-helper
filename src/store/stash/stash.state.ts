import { POEStashItem, POEPricedStashItem, POEStashTab } from '@/models/PathOfExile';

export interface StashState {
  loading: boolean;
  stashTabs: POEStashTab[];
  selectedStashTab: number;
  items: POEStashItem[];
  itemsDiff: POEStashItem[];
  itemsDiffIncome: POEPricedStashItem[];
}

export const state: StashState = {
  loading: false,
  stashTabs: [],
  selectedStashTab: -1,
  items: [],
  itemsDiff: [],
  itemsDiffIncome: []
};
