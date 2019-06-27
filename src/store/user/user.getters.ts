import { GetterTree } from 'vuex';

import { POECharacter } from '@/models/PathOfExile';
import { RootState } from '../state';
import { UserState } from './user.state';

export const userGetters = {
  poeSelectedCharacter: 'poeSelectedCharacter'
};

export const getters: GetterTree<UserState, RootState> = {
  [userGetters.poeSelectedCharacter](state): POECharacter | undefined {
    return state.characters.find((char) => char.name === state.selectedCharacter);
  }
};
