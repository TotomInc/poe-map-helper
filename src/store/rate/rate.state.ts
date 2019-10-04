import { POEWatchCurrency } from '@/models/POEWatch';

export interface RateState {
  loading: boolean;
  currencies: POEWatchCurrency[];
}

export const state: RateState = {
  loading: false,
  currencies: [],
};
