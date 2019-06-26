import { POELeague } from '@/models/PathOfExile';

export interface LeagueState {
  loading: boolean;
  leagues: POELeague[];
}

export const state: LeagueState = {
  loading: false,
  leagues: []
};
