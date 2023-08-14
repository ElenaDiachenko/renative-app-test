import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../../../../firebase.config';

import { UserType, SignupData, LoginData } from '../../../types';
import { resetLibraryState } from '../../library/slice';
import { resetMoviesState } from '../../movies/slice';
import { resetFilterState } from '../../filter/slice';

export const checkStatus = createAsyncThunk<UserType | null>(
  'auth/checkStatus',
  async () => {
    try {
      return await new Promise<UserType | null>((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user && user.displayName) {
            const token = await user.getIdToken();
            const currentUser: UserType = {
              username: user.displayName,
              token,
            };
            unsubscribe();
            console.log(currentUser, 'check');
            resolve(currentUser);
          } else {
            resolve(null);
          }
        });
      });
    } catch (err: any) {
      console.log(err);
      return null;
    }
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async (
    { email, password, username }: SignupData,
    { rejectWithValue }: any,
  ) => {
    console.log('Signup');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      if (auth?.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: username,
        });
      }
      const createdUser = auth.currentUser;

      const token = await createdUser?.getIdToken();

      const user: UserType = {
        username: createdUser?.displayName || '',
        token: token || '',
      };

      return user;
    } catch (err: any) {
      if (err instanceof Error) {
        return rejectWithValue(err);
      } else {
        console.log('Unexpected error' + err);
      }
    }
  },
);

export const logIn = createAsyncThunk(
  'auth/logIn',
  async ({ email, password }: LoginData, { rejectWithValue }: any) => {
    console.log('logIn');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const currentUser = auth.currentUser;
      const token = await currentUser?.getIdToken();
      const user: UserType = {
        username: currentUser?.displayName || '',
        token: token || '',
      };

      return user;
    } catch (err: any) {
      if (err instanceof Error) {
        return rejectWithValue(err);
      } else {
        console.log('Unexpected error' + err);
      }
    }
  },
);

export const logOut = createAsyncThunk(
  'auth/logOut',
  async (_, { dispatch, rejectWithValue }: any) => {
    console.log('logOut');
    try {
      await signOut(auth);

      dispatch(resetLibraryState());
      dispatch(resetMoviesState());
      dispatch(resetFilterState());

      return null;
    } catch (err: any) {
      if (err instanceof Error) {
        return rejectWithValue(err);
      } else {
        console.log('Unexpected error' + err);
      }
    }
  },
);
