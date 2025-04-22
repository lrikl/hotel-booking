import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchDestination = createAsyncThunk('destination/fetchDestination', async () => {
    try {
        const response = await axios.get('./static/serverData/db.json');
        return response.data;

    } catch (error) {
        console.error('Fetch destination failed: ', error)
        throw error;
    }
})

const destinationSlice = createSlice({
    name: 'destination',
    initialState: {
        list: [],
        isLoading: false
    },
    extraReducers: builder => {
        builder.addCase(fetchDestination.pending, (prevState) => {
            prevState.isLoading = true;
        });
        builder.addCase(fetchDestination.fulfilled, (prevState, {payload}) => {
            prevState.list = payload.destination;
            prevState.isLoading = false;
        });
    }
});

export default destinationSlice.reducer;