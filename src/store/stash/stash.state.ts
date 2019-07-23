import { POEStashItem } from '@/models/PathOfExile';

export interface StashState {
  loading: boolean;
  items: POEStashItem[];
  itemsDiff: POEStashItem[];
}

export const state: StashState = {
  loading: false,
  items: [],
  itemsDiff: []
};
