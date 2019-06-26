import { POEWatchCurrency } from '@/models/PathOfExileAPI';

export interface RateState {
  loading: boolean;
  currencies: POEWatchCurrency[];
}

export const state: RateState = {
  loading: false,
  currencies: []
};
