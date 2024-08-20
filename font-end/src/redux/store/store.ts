import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import destinationsSlice from "../../components/Maps/destinationsSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, destinationsSlice);

export const store = configureStore({
  reducer: {
    destinations: persistedReducer,
  },
});

export const persistor = persistStore(store);
