import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import hotelsState from '../slices/hotelsSlice.js';

const state = {
    hotels: {
        list: [],
        isLoading: false
    }
}

export const store = configureStore({
  reducer: {
    hotels: hotelsState, 
  },
  preloadedState: state,
  middleware: (getDefaultMiddleware) =>  getDefaultMiddleware().concat(logger), 
});

export default store;