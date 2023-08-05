import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { isPlatformWeb } from '@rnv/renative';
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
import storage from 'redux-persist/lib/storage';
import { authReducer } from './auth/slice';
import { filterReducer } from './filter/slice';

const rootReducer = combineReducers({
  auth: authReducer,
  movie: filterReducer,
});

const persistConfig = {
  key: 'state',
  storage: AsyncStorage,
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

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
