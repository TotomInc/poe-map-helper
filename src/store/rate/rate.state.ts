import { POEWatchCurrency } from '@/models/PathOfExile';

export interface RateState {
  loading: boolean;
  currencies: POEWatchCurrency[];
}

export const state: RateState = {
  loading: false,
  currencies: []
};
