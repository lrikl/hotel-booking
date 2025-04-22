import { createSlice } from "@reduxjs/toolkit";
import { fetchBookingData } from "./fetchDataThunks.js";

const hotelsSlice = createSlice({
    name: 'hotels',
    initialState: {
        list: [],
        isLoading: false
    },
    extraReducers: builder => {
        builder.addCase(fetchBookingData.pending, (prevState) => {
            prevState.isLoading = true;
        });
        builder.addCase(fetchBookingData.fulfilled, (prevState, {payload}) => {
            prevState.list = payload.hotels;
            prevState.isLoading = false;
        });
    }
});

export default hotelsSlice.reducer;