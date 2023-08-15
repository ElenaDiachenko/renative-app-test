import { RootState } from '..';

export const selectUser = (state: RootState) => state.auth;
export const selectToken = (state: RootState) => state.auth.user?.token;
