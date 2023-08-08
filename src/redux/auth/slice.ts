import { PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { UserType } from '../../types';
import { checkStatus, logIn, logOut, register } from './operations';

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
];

const pendingActionTypes = [
  logIn.pending,
  checkStatus.pending,
  register.pending,
  logOut.pending,
];

const rejectedActionTypes = [
  logIn.rejected,
  checkStatus.rejected,
  register.rejected,
  logOut.rejected,
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
