import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore,
} from 'redux-persist';
import { usersReducers } from '../feachers/Users/usersSlice.ts';
import { walletsReduser } from '../feachers/Wallets/WalletsSlice.ts';
import { transactionsReduser } from '../feachers/Transactions/TransactionsSlice.ts';
import { analiticsReducer } from '../feachers/Analitics/AnaliticsSlice.ts';

const usersPersistConfig = {
  key: 'wallet:users',
  storage: storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  wallets: walletsReduser,
  transactions: transactionsReduser,
  analitics: analiticsReducer,
  users: persistReducer(usersPersistConfig, usersReducers),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, REHYDRATE, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
