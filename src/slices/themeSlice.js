import { createSlice } from '@reduxjs/toolkit';

export const themeStateSlice = createSlice({
    name: 'themeState', 
    initialState: { 
      isTheme: 'light'
    },  
    reducers: { 
      setTheme: (state, action) => {
        state.isTheme = action.payload;
      },
      toggleTheme: (state) => {
        state.isTheme = state.isTheme === 'light' ? 'dark' : 'light';
      }
    },
});

export const { setTheme, toggleTheme } = themeStateSlice.actions;
export const selectTheme = (state) => state.themeState.isTheme;

export default themeStateSlice.reducer;