import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserType } from '../../types';

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

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

export const authReducer = authSlice.reducer;
