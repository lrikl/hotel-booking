'use strict';

import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; 

export default () => {

    const [destinationList, setDestinationList] = useState([]);

    async function fetchDestinationList() {
        const resp = await fetch('./static/serverData/db.json');
        const data = await resp.json();
        return setDestinationList(data.destination);
    }

    const [selectedValue, setSelectedValue] = useState('');
    
    const navigate = useNavigate();

    const handleSearch = () => {
        const selectedDestination = destinationList.find(dest => dest.label === selectedValue);

        if (selectedDestination) {
            const searchParams = new URLSearchParams({ city: selectedDestination.label.toLowerCase() }); // формуємо URL для сторінки готелів, додаючи місто як параметр запиту
            navigate(`/hotels?${searchParams.toString()}`); // редирект
        } else {
            alert("Не вдалося знайти вибраний напрямок.");
        }
    };
    
    useEffect(() => {
        fetchDestinationList();
    }, [])

    return (
        <div style={{ padding: '20px' }}>
            <label htmlFor="city-select">Виберіть місто: </label>
            <select
                id="city-select"
                value={selectedValue}
                onChange={(event) => {setSelectedValue(event.target.value)}}
                style={{ marginRight: '10px', padding: '5px' }}
            >
            <option value="">Виберіть місто</option>

                {destinationList.map(({value, label }) => (
                    <option key={value}>{label}</option>
                ))}
            </select>
    
            <button
                onClick={handleSearch}
                disabled={!selectedValue}
                style={{ padding: '5px 10px' }}
            >
                ok
            </button>
      </div>
    )
}