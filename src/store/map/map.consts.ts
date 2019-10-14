export const mapActions = {
  MAP_ITEM_COPIED: 'MAP_ITEM_COPIED',

  MANUAL_MAP_ACTIONS: 'MANUAL_MAP_ACTIONS',
  AUTOMATIC_MAP_ACTIONS: 'AUTOMATIC_MAP_ACTIONS',

  ENTER_MAP: 'ENTER_MAP',
  LEAVE_MAP: 'LEAVE_MAP',
};

export const mapMutations = {
  setQueuedMap: 'Set queued map',
  removeQueuedMap: 'Remove queued map',

  setCurrentMap: 'Set current map',
  removeCurrentMap: 'Remove current map',

  setLatestMap: 'Set latest map',
  removeLatestMap: 'Remove latest map',

  setMapStartedTime: 'Set map started time',

  addMapDone: 'Add a map done',

  enableAutomaticMode: 'Enable automatic mode',
  disableAutomaticMode: 'Disable automatic mode',

  enterMap: 'Set in-map',
  leaveMap: 'Remove in-map',
};

export const mapGetters = {
  mapsHistoryDate: 'mapsHistoryDate',
};
