import { createSlice } from "@reduxjs/toolkit";
import { fetchBookingData } from "./fetchDataThunks.js";

const hotelsSlice = createSlice({
    name: 'hotels',
    initialState: {
        list: [],
        isLoading: false,
        filteredList: []
    },
    reducers: {
        setFilteredList: (state, action) => {
            state.filteredList = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchBookingData.pending, (prevState) => {
            prevState.isLoading = true;
        });
        builder.addCase(fetchBookingData.fulfilled, (prevState, {payload}) => {
            prevState.list = payload?.hotels;
            prevState.isLoading = false;
        });
    }
});

export const { setFilteredList } = hotelsSlice.actions;

export default hotelsSlice.reducer;