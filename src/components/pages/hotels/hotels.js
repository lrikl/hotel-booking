import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHotels } from "../../../slices/hotelsSlice.js";

import "./hotels.scss";

export default () => {

    const hotelsList = useSelector(state => state.hotels.list)
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchHotels());
    }, [])

    return (
       <ul className="hotels-list">
            {hotelsList.map(({id, name, address, city}) => (
                <li key={id} className="hotels-li">
                    <div>Hotel: {name}</div>
                    <div>address: {address}</div>
                    <div>city: {city}</div>
                </li>
            ))}

       </ul>
    )
}