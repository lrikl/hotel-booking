import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchHotels = createAsyncThunk('hotels/fetchHotels', async () => {
    const resp = await fetch('./static/serverData/db.json');
    return await resp.json();
})

const hotelsSlice = createSlice({
    name: 'hotels',
    initialState: {
        list: [],
        isLoading: false
    },
    extraReducers: builder => {
        builder.addCase(fetchHotels.pending, (prevState) => {
            prevState.isLoading = true;
        });
        builder.addCase(fetchHotels.fulfilled, (prevState, {payload}) => {
            prevState.list = payload.hotels;
            prevState.isLoading = false;
        });
    }
});

export default hotelsSlice.reducer;