import { configureStore } from '@reduxjs/toolkit';
import hotelsState from '../slices/hotelsSlice.js';
import logger from 'redux-logger';
import themeState  from '../slices/themeSlice.js';
import localStorageMiddleware from './middleware/localStorageMiddleware.js';
import { loadState } from './utils/localStorage.js';

const loadedThemeState = loadState();

const preloadedState = {
  hotels: {
      list: [],
      isLoading: false
  },
  themeState: loadedThemeState !== undefined ? loadedThemeState : undefined
};

export const store = configureStore({
  reducer: {
    hotels: hotelsState, 
    themeState
  },
  preloadedState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware).concat(logger), 
});

export default store;