import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
    name: 'favorite',
    initialState: {
        favoriteList: []
    },
    reducers: {
        addFavorite: (state, action) => {
            const hotelToAdd = action.payload;
            const exists = state.favoriteList.some(hotel => hotel.id === hotelToAdd.id);
            if (!exists) {
              state.favoriteList.push(hotelToAdd);
            }
        },
        removeFavorite: (state, action) => {
            const hotelIdToRemove = action.payload;
            state.favoriteList = state.favoriteList.filter(hotel => hotel.id !== hotelIdToRemove);
        },
        removeFavoriteAll: (state, action) => {
            state.favoriteList = action.payload;
        }
    }
});

export const { addFavorite, removeFavorite, removeFavoriteAll } = favoritesSlice.actions;

export default favoritesSlice.reducer;