import { POEStashItem, POEPricedStashItem } from '@/models/PathOfExile';

export interface StashState {
  loading: boolean;
  items: POEStashItem[];
  itemsDiff: POEStashItem[];
  itemsDiffIncome: POEPricedStashItem[];
}

export const state: StashState = {
  loading: false,
  items: [],
  itemsDiff: [],
  itemsDiffIncome: []
};
