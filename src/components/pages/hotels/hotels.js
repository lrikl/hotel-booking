import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingData } from "../../../slices/fetchDataThunks.js";
import { useNavigate, useSearchParams } from 'react-router-dom'; 
import { setFilteredList } from "../../../slices/hotelsSlice.js";
import { addFavorite, removeFavorite } from "../../../slices/favoritesSlice.js";

import "./hotels.scss";
import { Button, CircularProgress, Grid } from "@mui/material";

export default () => {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const filteredHotels = useSelector(state => state.hotels.filteredList)
    const hotelsList = useSelector(state => state.hotels.list)
    const isLoading = useSelector(state => state.hotels.isLoading)
    const favoritesList = useSelector(state => state.favorite.favoriteList);
    const dispatch = useDispatch();

    // валідація параметрів пошуку------
    const validateDate = (dateString) => {
        if (!dateString) {
            return null;
        }
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                return null;
            }
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        } catch (error) {
            return null;
        }
    };

    const validateInt = (numString) => {
        if (!numString) {
            return null;
        }
        const num = parseInt(numString, 10);
        return !isNaN(num) && num >= 0 && num <=10 ? num : null;
    };

    const validateRating = (numString) => {
        if (!numString) {
            return null;
        }
        const num = parseFloat(numString);
        return !isNaN(num) && num >= 1 ? num : null;
    };
    // --------

    const validatedParams = useMemo(() => { // useMemo, щоб не перераховувати при кожному рендері, якщо searchParams не змінилися
        const city = searchParams.get('city')?.trim();
        const checkIn = validateDate(searchParams.get('checkIn'));
        const checkOut = validateDate(searchParams.get('checkOut'));
        const adults = validateInt(searchParams.get('adults'));
        const children = validateInt(searchParams.get('children'));
        const rating = validateRating(searchParams.get('rating'));

        if(!city || !checkIn || !checkOut) {
            console.warn("Required params missing, redirecting...");
            navigate('/', { replace: true });
        }

        return { city, checkIn, checkOut, adults, children, rating };
    }, [searchParams]);

    const { city, checkIn, checkOut, adults, children, rating} = validatedParams;

    useEffect(() => {
        dispatch(fetchBookingData());
    }, [])

    useEffect(() => {
        const minRating = rating ? Number(rating) : null;
        const applyRatingFilter = minRating !== null && !isNaN(minRating);
    
        const results = hotelsList.filter(hotel => {
            const cityMatch = hotel.city?.toLowerCase() === city?.toLowerCase();

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
    
        dispatch(setFilteredList(results));
    
    }, [city, hotelsList, rating]);

    const handleAddFavorite = (hotel) => {
        dispatch(addFavorite(hotel));
    };

    const handleRemoveFavorite = (hotelId) => {
        dispatch(removeFavorite(hotelId));
    };

    return (
        <div className="hotels-wrap">

            {isLoading ? (
                <Grid container justifyContent="center" sx={{ mt: 2 }}>
                    <CircularProgress sx={{color: '#fc9703'}} />
                </Grid>

            ) : (filteredHotels.length > 0 ? (
                <>
                    <div className="hotels-informations">
                        <h2 className="hotels-title">Hotels in <span className="sity-name">{city}</span></h2>
                        <div className="hotels-date">From <span className="orange-color">{checkIn}</span> to <span className="orange-color">{checkOut}</span></div>
                        { adults && <div className="hotels-adults">Adults: <span className="orange-color">{adults}</span></div>}
                        { children && <div className="hotels-children">Children: <span className="orange-color">{children}</span></div>}
                        { rating && <div className="hotels-rating">Rating from: <span className="orange-color">{rating}</span></div>}
                    </div>

                    <ul className="hotels-list">
                        {filteredHotels.map((hotel) => {
                            const isFavorite = favoritesList.some(favHotel => favHotel.id === hotel.id);
                            const { id, name, address, city, hotel_rating, phone_number, imgUrl } = hotel;

                            return (
                                <li key={id} className='hotels-item'>
                                    <div className="hotels-item-img"><img className="" alt="hotel-img" src={imgUrl} /></div>
                                    <div className="hotels-item-details"> 
                                        <div className="hotels-item-text">
                                            <h4 className="hotels-item-title">{name}</h4>
                                            <div>Address: {address} </div>
                                            <div>City: {city} </div>
                                            <div>Rating: {hotel_rating}</div>
                                            {phone_number && <div>Phone Number: {phone_number}</div>}
                                        </div>

                                        <Button
                                            variant="contained"
                                            size="small"
                                            onClick={() => isFavorite ? handleRemoveFavorite(id) : handleAddFavorite(hotel)}
                                            sx={{
                                                backgroundColor: isFavorite ? '#aaaaaa' : '#fc9703',
                                                fontWeight: 'bold',
                                                '&:hover': {
                                                    backgroundColor: isFavorite ? '#888888' : '#e08000',
                                                }
                                            }}
                                        >
                                            {isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
                                        </Button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </>
            ) : (
                <h3>Nothing was found for the specified parameters.</h3>
            ))}

        </div>
    )
}