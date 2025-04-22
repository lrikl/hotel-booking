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

            { filteredHotels && filteredHotels.length > 0 ? (
                <>
                    <h3>Hotels in {cityName} from {checkIn} to {checkOut}
                        { adults && <span> Adults: {adults},</span> } 
                        { children && <span> Children: {children},</span> } 
                        { rating && <span> Rating from: {rating}</span> }
                    </h3>

                    <ul className="hotels-list">
                        {filteredHotels.map(({id, name, address, city, hotel_rating, phone_number}) => (
                            <li key={id} className="hotels-li">
                                <div>Hotel: {name}</div>
                                <div>Address: {address} </div>
                                <div>City: {city} </div>
                                <div>Rating: {hotel_rating}</div>
                                {phone_number && <div>Phone Number: {phone_number}</div>}
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <>
                    <h3>Nothing was found for the specified parameters. List of all hotels:</h3>
                    { hotelsList.length > 0 && (
                        <ul className="hotels-list">
                            {hotelsList.map(({id, name, address, city, hotel_rating, phone_number}) => (
                                <li key={id} className="hotels-li">
                                    <div>Hotel: {name}</div>
                                    <div>Address: {address} </div>
                                    <div>City: {city} </div>
                                    <div>Rating: {hotel_rating}</div>
                                    {phone_number && <div>Phone Number: {phone_number}</div>}
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}

        </div>
    )
}