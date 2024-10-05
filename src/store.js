import { configureStore } from '@reduxjs/toolkit';
import salesReducer from './features/salesSlice';

const store = configureStore({
  reducer: {
    sales: salesReducer,
  },
});

export default store;
