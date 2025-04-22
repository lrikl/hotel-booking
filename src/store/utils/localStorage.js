const STORAGE_KEY = 'BOOKING_DATA_STORAGE';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (serializedState === null) {
      return;
    }
    const parsedState = JSON.parse(serializedState);
    return { 
      isTheme: parsedState.bookingTheme
    };

  } catch (error) {
    console.error("Could not load state from localStorage", error);
    return;
  }
};

export const saveState = (state) => { 
  try {
    const stateToSave = { 
      bookingTheme: state.themeState.isTheme
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  } catch (error) {
    console.error("Could not save state to localStorage", error);
  }
};