import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserType } from '../../types';
import { logIn } from './operations';

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
    builder.addCase(logIn.fulfilled, (state, { payload }) => {
      state.user = payload;
    }),
});

export const authReducer = authSlice.reducer;
