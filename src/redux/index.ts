import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import { authReducer, AuthState } from './auth/slice';
import { filterReducer, FilterState } from './filter/slice';
import { libraryReducer, LibraryState } from './library/slice';
import { movieReducer, MoviesState } from './movies/slice';

export type RootState = {
  auth: AuthState;
  filter: FilterState;
  library: LibraryState;
  movies: MoviesState;
};
const rootReducer = combineReducers({
  auth: authReducer,
  filter: filterReducer,
  library: libraryReducer,
  movies: movieReducer,
});

const persistConfig = {
  key: 'state',
  storage: AsyncStorage,
  blacklist: ['library', 'movies'],
};

const persistedReduser = persistReducer<ReturnType<typeof rootReducer>>(
  persistConfig,
  rootReducer,
);

export const store = configureStore({
  reducer: persistedReduser,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
