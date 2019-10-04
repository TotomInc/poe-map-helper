export const stashActions = {
  GET_STASH_TABS: 'GET_STASH_TABS',
  GET_STASH_TABS_SUCCESS: 'GET_STASH_TABS_SUCCESS',
  GET_STASH_TABS_FAILED: 'GET_STASH_TABS_FAILED',

  GET_STASH_ITEMS: 'GET_STASH_ITEMS',
  GET_STASH_ITEMS_SUCCESS: 'GET_STASH_ITEMS_SUCCESS',
  GET_STASH_ITEMS_FAILED: 'GET_STASH_ITEMS_FAILED',

  CALCULATE_STASH_DIFF: 'CALCULATE_STASH_DIFF',

  CALCULATE_ITEMS_DIFF_INCOME: 'CALCULATE_ITEMS_DIFF_INCOME',
};

export const stashMutations = {
  setLoading: 'Set stash loading',
  removeLoading: 'Remove stash loading',

  setInitialLoad: 'Set stash initial load',
  removeInitialLoad: 'Remove stash initial load',

  setStashTabs: 'Set stash tabs',
  removeStashTabs: 'Remove stash tabs',

  selectStashTab: 'Select stash tab',
  unselectStashTab: 'Unselect stash tab',

  setItems: 'Set stash items',
  removeItems: 'Remove stash items',

  setItemsDiff: 'Set items diff',
  removeItemsDiff: 'Remove items diff',

  setItemsDiffIncome: 'Set items diff income',
  removeItemsDiffIncome: 'Remove items diff income',
};

export const stashGetters = {
  getTotalItemsDiffIncome: 'getTotalItemsDiffIncome',

  getStashTabIndex: 'getStashTabIndex',
};
