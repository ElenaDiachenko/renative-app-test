import { createAsyncThunk } from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import { UserType, SignupData, LoginData } from '../../types';

export const checkStatus = () => {};
export const register = () => {};

export const logIn = createAsyncThunk(
  'auth/logIn',
  async ({ email, password }: LoginData, { rejectWithValue }: any) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      const currentUser = auth().currentUser;
      const token = await currentUser?.getIdToken();
      const user: UserType = {
        username: currentUser?.displayName || '',
        token: token || '',
      };

      return user;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err);
      } else {
        console.log('Unexpected error', err);
      }
    }
  },
);
