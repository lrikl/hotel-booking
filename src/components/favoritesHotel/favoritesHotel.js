import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite, removeFavoriteAll } from "../../slices/favoritesSlice.js";
import { Button } from "@mui/material";

export default () => {
    const favoritesList = useSelector(state => state.favorite.favoriteList);
    const dispatch = useDispatch();

    const handleAddFavorite = (hotel) => {
        dispatch(addFavorite(hotel));
    };
    
    const handleRemoveFavorite = (hotelId) => {
        dispatch(removeFavorite(hotelId));
    };

    const handleRemoveAll = () => {
        dispatch(removeFavoriteAll([]));
    }

    return (
        <>
        { favoritesList.length > 0 ? (
            <>
                {favoritesList.length > 1 && (
                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleRemoveAll}
                        sx={{
                            backgroundColor: '#fc9703', 
                            fontWeight: 'bold'
                        }}
                    >
                        Delete All
                    </Button>
                )}
                
                <ul className="hotels-list">
                    {favoritesList.map((hotel) => {
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
            <h3>Favorite hotels list is empty.</h3>
        )
        }
        </>
    )
}