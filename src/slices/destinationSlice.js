import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchDestination = createAsyncThunk('destination/fetchDestination', async () => {
    const resp = await fetch('./static/serverData/db.json');
    return await resp.json();
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