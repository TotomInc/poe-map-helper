export interface UserState {
  logged: boolean;
  poesessid: string | undefined;
  loading: boolean;
  characters: any[];
}

export const state: UserState = {
  logged: false,
  poesessid: undefined,
  loading: false,
  characters: []
};
