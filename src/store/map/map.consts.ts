export const mapActions = {
  MAP_ITEM_COPIED: 'MAP_ITEM_COPIED',

  ENTER_MAP: 'ENTER_MAP',
  LEAVE_MAP: 'LEAVE_MAP'
};

export const mapMutations = {
  setQueuedMap: 'Set queued map',
  removeQueuedMap: 'Remove queued map',

  setCurrentMap: 'Set current map as queued map',
  removeCurrentMap: 'Remove current map',

  setLatestMap: 'Set latest map as queued map',
  removeLatestMap: 'Remove latest map',

  setLatestMapIncomeCalculated: 'Set latest map income calculated',
  removeLatestMapIncomeCalculated: 'Remove latest map income calculated',

  addMapDone: 'Add a map done',

  enterMap: 'Set in-map',
  leaveMap: 'Remove in-map'
};
