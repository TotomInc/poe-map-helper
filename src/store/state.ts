import { UserState, state as userState } from './user/user.state';
import { MapState, state as mapState } from './map/map.state';
import { RateState, state as rateState } from './rate/rate.state';
import { StashState, state as stashState } from './stash/stash.state';
import { ShareState, state as shareState } from './share/share.state';

export interface RootState {
  user: UserState;
  map: MapState;
  rate: RateState;
  stash: StashState;
  share: ShareState;
}

export const rootState: RootState = {
  user: userState,
  map: mapState,
  rate: rateState,
  stash: stashState,
  share: shareState,
};
