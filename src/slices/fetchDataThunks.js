import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const BEECEPTOR_URL = 'https://booking-test-server.free.beeceptor.com/api/db.json';
const LOCAL_URL = './static/serverData/db.json'; 
const LOCAL_HOTEL_IMG = './static/serverData/hotels-img.json'; 

export const fetchBookingData  = createAsyncThunk('data/fetchBookingData', async () => {
    let resp = null;
    try {
        try {
            resp = await axios.get(BEECEPTOR_URL);

        } catch (error) {
            console.warn(`Beeceptor fetch data failed: ${error.message}`);
            
            resp = await axios.get(LOCAL_URL);
        }
        const db = resp.data;

        resp = await axios.get(LOCAL_HOTEL_IMG);
        const imgData = resp.data;

        db.hotels.forEach(hotel => {
            hotel.imgUrl = imgData.hotels.find(({id}) => id === hotel.id)?.imgUrl || '';
        })

        return {
            hotels: db.hotels,
            destination: db.destination
        };

    } catch (error) {
        console.error('All fetch data failed: ', error)
        throw error;
    }
},
{
    condition: (_, { getState }) => {  // condition перевіряє, чи потрібно виконувати запит, дивлячись на поточний стан сховища (через getState), щоб уникнути дублювання запитів 
        const { hotels, destination } = getState(); // getState() повертає весь об'єкт стану Redux. деструктуруємо з нього потрібні слайси

        if (hotels.isLoading || destination.isLoading) {
            return false; 
        }

        if (hotels.list.length > 0 && destination.list.length > 0) {
            return false; 
        }

        return true; 
    }
}
);