import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const BEECEPTOR_URL = 'https://booking-test-server.free.beeceptor.com/api/db.json';
const LOCAL_URL = './static/serverData/db.json'; 

export const fetchBookingData  = createAsyncThunk('data/fetchBookingData', async () => {
    let resp = null;
    try {
        try {
            resp = await axios.get(BEECEPTOR_URL);

        } catch (error) {
            console.warn(`Beeceptor fetch data failed: ${error.message}`);
            
            resp = await axios.get(LOCAL_URL);
        }
        return resp.data;


    } catch (error) {
        console.error('All fetch data failed: ', error)
        throw error;
    }
})