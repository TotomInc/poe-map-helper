import { ActionTree } from 'vuex';

import { IpcHttpRequestOption } from '@/models/IpcHttp';
import { POELeague } from '@/models/PathOfExileAPI';
import { ipcHttpRequest } from '@/store/ipc-to-store';
import { RootState } from '@/store/state';
import { LeagueState } from './league.state';
import { leagueMutations } from './league.mutations';

export const leagueActions = {
  LOAD_LEAGUES: 'LOAD_LEAGUES',
  LOAD_LEAGUES_SUCCESS: 'LOAD_LEAGUES_SUCCESS',
  LOAD_LEAGUES_FAILED: 'LOAD_LEAGUES_FAILED'
};

export const actions: ActionTree<LeagueState, RootState> = {
  [leagueActions.LOAD_LEAGUES](context, payload: void) {
    const requestPayload: IpcHttpRequestOption = {
      url: 'https://api.poe.watch/leagues',
      onSuccessIpc: leagueActions.LOAD_LEAGUES_SUCCESS,
      onFailIpc: leagueActions.LOAD_LEAGUES_FAILED,
      axiosOptions: {
        method: 'GET'
      }
    };

    context.commit(leagueMutations.setLoading);

    ipcHttpRequest(requestPayload);
  },

  [leagueActions.LOAD_LEAGUES_SUCCESS](context, payload: POELeague[]) {
    context.commit(leagueMutations.setLeagues, payload);
    context.commit(leagueMutations.removeLoading);
  },

  [leagueActions.LOAD_LEAGUES_FAILED](context, payload: void) {
    context.commit(leagueMutations.removeLoading);
  }
};
