import { saveState } from '../utils/localStorage.js';

const localStorageMiddleware = store => next => action => {
  const result = next(action);

  if (action.type.startsWith('themeState/')) { 
    const state = store.getState(); 
    saveState(state); 
  }

  return result;
};

export default localStorageMiddleware;