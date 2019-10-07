export const userActions = {
  COOKIE_LOGIN: 'COOKIE_LOGIN',
  COOKIE_LOGIN_SUCCESS: 'COOKIE_LOGIN_SUCCESS',
  COOKIE_LOGIN_FAILED: 'COOKIE_LOGIN_FAILED',

  LOAD_CHARACTERS: 'LOAD_CHARACTERS',
  LOAD_CHARACTERS_SUCCESS: 'LOAD_CHARACTERS_SUCCESS',
  LOAD_CHARACTERS_FAILED: 'LOAD_CHARACTERS_FAILED',

  UPDATE_CHARACTER: 'UPDATE_CHARACTER',

  FINISH_SETUP: 'FINISH_SETUP',

  LOGOUT: 'LOGOUT',

  ANALYTICS_TRACKING: 'ANALYTICS_TRACKING',
};

export const userMutations = {
  setLoading: 'Set user loading',
  removeLoading: 'Remove user loading',

  setLogged: 'Set user logged',
  removeLogged: 'Remove user logged',

  setPOESESSID: 'Set user POESESSID',

  setCharacters: 'Set user characters',
  removeCharacters: 'Remove user characters',

  setSelectedCharacter: 'Set user selected character',
  removeSelectedCharacter: 'Remove user selected character',

  setAccountName: 'Set user account name',
  removeAccountName: 'Remove user account name',
};

export const userGetters = {
  poeSelectedCharacter: 'poeSelectedCharacter',
};
