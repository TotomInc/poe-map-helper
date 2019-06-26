import { UserState, state as userState } from './user/user.state';
import { MapState, state as mapState } from './map/map.state';
import { LeagueState, state as leagueState } from './league/league.state';
import { RateState, state as rateState } from './rate/rate.state';

export interface RootState {
  user: UserState;
  map: MapState;
  league: LeagueState;
  rate: RateState;
}

export const rootState: RootState = {
  user: userState,
  map: mapState,
  league: leagueState,
  rate: rateState
};
