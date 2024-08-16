import { configureStore } from '@reduxjs/toolkit';
import destinationsSlice from '../components/Maps/destinationsSlice';

export const store  = configureStore({
  reducer: {
    destinations: destinationsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;