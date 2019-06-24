import { UserState, state as userState } from './user/user.state';
import { MapState, state as mapState } from './map/map.state';

export interface RootState {
  user: UserState;
  map: MapState;
}

export const rootState: RootState = {
  user: userState,
  map: mapState
};
