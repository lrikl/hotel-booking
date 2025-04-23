import { saveStorageState } from '../utils/localStorage.js';

const localStorageMiddleware = store => next => action => {
  const result = next(action);

  if (action.type.startsWith('themeState/') || action.type.startsWith('favorite/')) { 
    const state = store.getState(); 
    saveStorageState(state); 
  }

  return result;
};

export default localStorageMiddleware;