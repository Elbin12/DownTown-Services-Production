import { configureStore } from "@reduxjs/toolkit";
import userReducer from './user'
import adminReducer from './admin'
import workerReducer from './worker';
import anonymous_userReducer from './anonymous_user';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { combineReducers } from 'redux';


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'admin', 'worker', 'anonymous_user'],
  };

  const rootReducer = combineReducers({
    user: userReducer,
    admin:adminReducer,
    worker:workerReducer,
    anonymous_user:anonymous_userReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoreActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        },
      }),
  });


export const persistor = persistStore(store);