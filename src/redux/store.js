import { configureStore } from '@reduxjs/toolkit';
import RootReducer from './RootReducer';

const Store = configureStore({
  reducer: RootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export default Store;
