import { configureStore } from '@reduxjs/toolkit';
import hotels from '../slices/hotelsSlice.js';
import destination from '../slices/destinationSlice.js';
// import logger from 'redux-logger';
import themeState  from '../slices/themeSlice.js';
import localStorageMiddleware from './middleware/localStorageMiddleware.js';
import { loadStorageState } from './utils/localStorage.js';
import favorite from '../slices/favoritesSlice.js';


const preloadedState = loadStorageState();

export const store = configureStore({
  reducer: {
    hotels, 
    destination,
    themeState,
    favorite
  },
  preloadedState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware), 
});

export default store;