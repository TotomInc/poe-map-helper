import { UserState, state } from './user/user.state';

export interface RootState {
  user: UserState;
}

export const rootState: RootState = {
  user: state
};
