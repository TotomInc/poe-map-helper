export const shareActions = {
  CREATE_SHARE: 'CREATE_SHARE',
  CREATE_SHARE_SUCCESS: 'CREATE_SHARE_SUCCESS',
  CREATE_SHARE_FAILED: 'CREATE_SHARE_FAILED',

  LOAD_SHARE: 'LOAD_SHARE',
  LOAD_SHARE_SUCCESS: 'LOAD_SHARE_SUCCESS',
  LOAD_SHARE_FAILED: 'LOAD_SHARE_FAILED',

  REMOVE_SHARE_DATA: 'REMOVE_SHARE_DATA',
};

export const shareMutations = {
  setLoading: 'Set share loading',
  removeLoading: 'Remove share loading',

  setBinID: 'Set share bin ID',
  removeBinID: 'Remove share bin ID',

  setCharacter: 'Set share character',
  removeCharacter: 'Remove share character',

  setMaps: 'Set share maps',
  removeMaps: 'Remove share maps',
};

export const shareGetters = {
  sharedMapsHistoryDate: 'sharedMapsHistoryDate',
};
