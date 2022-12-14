import {
  combineReducers,
  configureStore,
  PreloadedState
} from "@reduxjs/toolkit";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage/session";
import { persistReducer } from "redux-persist";
import authSlice from "./ducks/auth/authSlice";
import selectedProblemSlice from "./ducks/selectedProblem/selectedProblemSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  selectedProblem: selectedProblemSlice
});

const persistConfig = {
  key: "root",
  storage,
  whiteList: ["auth"]
};

const persistRootReducer = persistReducer(persistConfig, rootReducer);

// eslint-disable-next-line no-use-before-define
export const setUpStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: persistRootReducer,
    preloadedState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({ serializableCheck: false }).concat(logger)
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setUpStore>;
export type AppDispatch = AppStore["dispatch"];
