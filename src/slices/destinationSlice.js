import { createSlice } from "@reduxjs/toolkit";
import { fetchBookingData } from "./fetchDataThunks.js";

const destinationSlice = createSlice({
    name: 'destination',
    initialState: {
        list: [],
        isLoading: false
    },
    extraReducers: builder => {
        builder.addCase(fetchBookingData.pending, (prevState) => {
            prevState.isLoading = true;
        });
        builder.addCase(fetchBookingData.fulfilled, (prevState, {payload}) => {
            prevState.list = payload?.destination;
            prevState.isLoading = false;
        });
    }
});

export default destinationSlice.reducer;