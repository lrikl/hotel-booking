const STORAGE_KEY = 'BOOKING_DATA_STORAGE';

export const loadStorageState = () => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (serializedState === null) {
      return;
    }
    const parsedState = JSON.parse(serializedState);
    return { 
      themeState: {isTheme: parsedState.bookingTheme},
      favorite: {favoriteList: parsedState.favoriteHotels},
    };

  } catch (error) {
    console.error("Could not load state from localStorage", error);
    return;
  }
};

export const saveStorageState = (state) => { 
  try {
    const stateToSave = { 
      bookingTheme: state.themeState.isTheme,
      favoriteHotels: state.favorite.favoriteList
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  } catch (error) {
    console.error("Could not save state to localStorage", error);
  }
};