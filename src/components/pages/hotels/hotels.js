import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingData } from "../../../slices/fetchDataThunks.js";
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
        dispatch(fetchBookingData());
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

            { filteredHotels.length > 0 ? (
                <>
                    <div className="hotels-informations">
                        <h2 className="hotels-title">Hotels in <span className="sity-name">{cityName}</span></h2>
                        <div className="hotels-date">From <span className="orange-color">{checkIn}</span> to <span className="orange-color">{checkOut}</span></div>
                        { adults && <div className="hotels-adults">Adults: <span className="orange-color">{adults}</span></div>}
                        { children && <div className="hotels-children">Children: <span className="orange-color">{children}</span></div>}
                        { rating && <div className="hotels-rating">Rating from: <span className="orange-color">{rating}</span></div>}
                    </div>

                    <ul className="hotels-list">
                        {filteredHotels.map(({id, name, address, city, hotel_rating, phone_number, imgUrl}) => (
                            <li key={id} className='hotels-item'>
                                <div className="hotels-item-img"><img className="" alt="hotel-img" src={imgUrl} /></div>
                                <div>
                                    <h4 className="hotels-item-title">{name}</h4>
                                    <div>Address: {address} </div>
                                    <div>City: {city} </div>
                                    <div>Rating: {hotel_rating}</div>
                                    {phone_number && <div>Phone Number: {phone_number}</div>}
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <h3>Nothing was found for the specified parameters.</h3>
            )}

        </div>
    )
}