import { ActionTree } from 'vuex';
import axios from 'axios';

import { POEShare } from '@/models/PathOfExile';
import { RootState } from '@/store/state';
import { ShareState } from './share.state';
import { shareActions, shareMutations } from './share.consts';

export const actions: ActionTree<ShareState, RootState> = {
  async [shareActions.CREATE_SHARE](context, payload: string) {
    context.commit(shareMutations.setLoading);

    return axios
      .post('https://api.jsonbin.io/b/', payload, {
        headers: {
          'Content-Type': 'application/json',
          'secret-key': '$2b$10$gRhmLSfmU/QxmWS8jGarjeeoWH6Ld9ssN00A91R.nCWNjTubYvQDq',
        },
      })
      .then((response) => {
        if (response.status === 200) {
          context.dispatch(shareActions.CREATE_SHARE_SUCCESS, response.data.id);
        } else {
          context.dispatch(shareActions.CREATE_SHARE_FAILED);
        }
      })
      .catch((error) => {
        context.dispatch(shareActions.CREATE_SHARE_FAILED);
      });
  },

  [shareActions.CREATE_SHARE_SUCCESS](context, payload: string) {
    context.commit(shareMutations.removeLoading);
  },

  [shareActions.CREATE_SHARE_FAILED](context, payload: void) {
    context.commit(shareMutations.removeLoading);
  },

  async [shareActions.LOAD_SHARE](context, payload: string) {
    context.commit(shareMutations.setLoading);

    return axios
      .get(`https://api.jsonbin.io/b/${payload}`, {
        headers: {
          'Content-Type': 'application/json',
          'secret-key': '$2b$10$gRhmLSfmU/QxmWS8jGarjeeoWH6Ld9ssN00A91R.nCWNjTubYvQDq',
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const successPayload = {
            data: response.data as POEShare,
            binID: payload,
          };

          context.dispatch(shareActions.LOAD_SHARE_SUCCESS, successPayload);
        } else {
          context.dispatch(shareActions.LOAD_SHARE_FAILED, response.data);
        }
      })
      .catch((error) => {
        context.dispatch(shareActions.LOAD_SHARE_FAILED, error);
      });
  },

  [shareActions.LOAD_SHARE_SUCCESS](context, payload: { data: POEShare; binID: string }) {
    context.commit(shareMutations.setBinID, payload.binID);
    context.commit(shareMutations.setCharacter, payload.data.character);
    context.commit(shareMutations.setMaps, payload.data.maps);
    context.commit(shareMutations.removeLoading);
  },

  [shareActions.LOAD_SHARE_FAILED](context, payload: Error) {
    context.commit(shareMutations.removeLoading);
  },
};
