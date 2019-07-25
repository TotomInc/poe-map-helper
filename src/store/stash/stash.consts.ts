export const stashActions = {
  GET_STASH_ITEMS: 'GET_STASH_ITEMS',
  GET_STASH_ITEMS_SUCCESS: 'GET_STASH_ITEMS_SUCCESS',
  GET_STASH_ITEMS_FAILED: 'GET_STASH_ITEMS_FAILED',

  CALCULATE_STASH_DIFF: 'CALCULATE_STASH_DIFF',

  CALCULATE_ITEMS_DIFF_INCOME: 'CALCULATE_ITEMS_DIFF_INCOME'
};

export const stashMutations = {
  setLoading: 'Set stash loading',
  removeLoading: 'Remove stash loading',

  setItems: 'Set stash items',
  removeItems: 'Remove stash items',

  setItemsDiff: 'Set items diff',
  removeItemsDiff: 'Remove items diff',

  setItemsDiffIncome: 'Set items diff income',
  removeItemsDiffIncome: 'Remove items diff income'
};

export const stashGetters = {
  getTotalItemsDiffIncome: 'getTotalItemsDiffIncome'
};
