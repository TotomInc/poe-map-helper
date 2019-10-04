import { POEStashItem, POEPricedStashItem, POEStashTab } from '@/models/PathOfExile';

export interface StashState {
  loading: boolean;
  initialLoad: boolean;
  stashTabs: POEStashTab[];
  selectedStashTab: string | undefined;
  items: POEStashItem[];
  itemsDiff: POEStashItem[];
  itemsDiffIncome: POEPricedStashItem[];
}

export const state: StashState = {
  loading: false,
  initialLoad: false,
  stashTabs: [],
  selectedStashTab: undefined,
  items: [],
  itemsDiff: [],
  itemsDiffIncome: [],
};
