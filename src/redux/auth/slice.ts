import { PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { isWebBased } from '@rnv/renative';
import { UserType } from '../../types';
import { checkStatus, logIn, logOut, register } from './operations/index';
import {
  checkStatus as checkStatusWeb,
  logIn as logInWeb,
  logOut as logOutWeb,
  register as registerWeb,
} from './operations/index.web';

export interface IAuthState {
  user: UserType | null;
  isLoading: boolean;
  isError: Error | string | null;
}
const initialState: IAuthState = {
  user: null,
  isLoading: false,
  isError: null,
};

const fulfilledActionTypes = [
  logIn.fulfilled,
  checkStatus.fulfilled,
  register.fulfilled,
  logOut.fulfilled,
  logInWeb.fulfilled,
  checkStatusWeb.fulfilled,
  registerWeb.fulfilled,
  logOutWeb.fulfilled,
];

const pendingActionTypes = [
  logIn.pending,
  checkStatus.pending,
  register.pending,
  logOut.pending,
  logInWeb.pending,
  checkStatusWeb.pending,
  registerWeb.pending,
  logOutWeb.pending,
];

const rejectedActionTypes = [
  logIn.rejected,
  checkStatus.rejected,
  register.rejected,
  logOut.rejected,
  logInWeb.rejected,
  checkStatusWeb.rejected,
  registerWeb.rejected,
  logOutWeb.rejected,
];

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder

      .addMatcher(
        isAnyOf(...fulfilledActionTypes),
        (state, action: PayloadAction<UserType | null>) => {
          state.user = action.payload;
          state.isLoading = false;
          state.isError = null;
        },
      )
      .addMatcher(isAnyOf(...pendingActionTypes), (state) => {
        state.isLoading = true;
      })
      .addMatcher(
        isAnyOf(...rejectedActionTypes),
        (state, { payload }: { payload: any }) => {
          state.isError = payload;
        },
      ),
});

export const authReducer = authSlice.reducer;
export type AuthState = ReturnType<typeof authReducer>;
