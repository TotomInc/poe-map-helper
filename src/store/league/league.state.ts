import { POELeague } from '@/models/PathOfExileAPI';

export interface LeagueState {
  loading: boolean;
  leagues: POELeague[];
}

export const state: LeagueState = {
  loading: false,
  leagues: []
};
