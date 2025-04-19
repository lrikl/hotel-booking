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

    useEffect(() => {
        dispatch(fetchHotels());
    }, [])

    useEffect(() => {
        const results = hotelsList.filter(hotel => hotel.city.toLowerCase() === cityName);
        setFilteredHotels(results);
    }, [cityName, hotelsList])

    return (
       <ul className="hotels-list">
            {filteredHotels.map(({id, name, address, city}) => (
                <li key={id} className="hotels-li">
                    <div>Hotel: {name}</div>
                    <div>address: {address}</div>
                    <div>city: {city}</div>
                </li>
            ))}

       </ul>
    )
}