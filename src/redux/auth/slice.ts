import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserType } from '../../types';
import { checkStatus, logIn, logOut, register } from './operations';

export interface IAuthState {
  user: UserType | null;
  isLoading: boolean;
  isError: Error | string;
}
const initialState: IAuthState = {
  user: null,
  isLoading: false,
  isError: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(logIn.fulfilled, (state, { payload }) => {
        state.user = payload;
      })
      .addCase(checkStatus.fulfilled, (state, { payload }) => {
        state.user = payload;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.user = payload;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = null;
      }),
});

export const authReducer = authSlice.reducer;
