import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHotels } from "../../../slices/hotelsSlice.js";
import { useSearchParams } from 'react-router-dom'; 

import "./hotels.scss";

export default () => {

    const [searchParams] = useSearchParams();
    const [filteredHotels, setFilteredHotels] = useState([]);

    const hotelsList = useSelector(state => state.hotels.list)
    const dispatch = useDispatch();


    const cityName = searchParams.get('city');
    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');
    const adults = searchParams.get('adults');
    const children = searchParams.get('children');
    const rating = searchParams.get('rating');

    useEffect(() => {
        dispatch(fetchHotels());
    }, [])

    useEffect(() => {
        const minRating = rating ? Number(rating) : null;
        const applyRatingFilter = minRating !== null && !isNaN(minRating);
    
        const results = hotelsList.filter(hotel => {
            const cityMatch = hotel.city?.toLowerCase() === cityName?.toLowerCase();

            if (!cityMatch) {
                return false; 
            }
    
            if (applyRatingFilter) {
                const ratingMatch = hotel.hotel_rating !== null && hotel.hotel_rating >= minRating;
                if (!ratingMatch) {
                    return false; 
                }
            }
    
            return true;
        });
    
        setFilteredHotels(results);
    
    }, [cityName, hotelsList, rating]);

    return (
        <div className="hotels-wrap">
            <h3>Готелі у {cityName} з {checkIn} по {checkOut}
                { children && <span> Дітей: {children},</span> } 
                { adults && <span> Тварин: {adults},</span> } 
                { rating && <span> Рейтинг від: {rating}</span> }
            </h3>

            { filteredHotels && filteredHotels.length > 0 ? (
                <ul className="hotels-list">
                    {filteredHotels.map(({id, name, address, city, hotel_rating, phone_number}) => (
                        <li key={id} className="hotels-li">
                            <div>Hotel: {name}</div>
                            <div>address: {address} </div>
                            <div>city: {city} </div>
                            <div>rating: {hotel_rating}</div>
                            <div>phone number: {phone_number}</div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div>Нічого не знайдено</div>
            )}

        </div>
    )
}