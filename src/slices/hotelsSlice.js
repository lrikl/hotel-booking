import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchHotels = createAsyncThunk('hotels/fetchHotels', async () => {
    try {
        const response = await axios.get('./static/serverData/db.json');
        return response.data;

    } catch (error) {
        console.error('Fetch hotels failed: ', error)
        throw error;
    }
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