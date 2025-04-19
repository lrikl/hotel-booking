'use strict';

import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; 

import './home.scss'

export default () => {

    const [destinationList, setDestinationList] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [numbAdults, setNumbAdults] = useState('');
    const [numbChildren, setNumbChildren] = useState('');
    const [hotelsRating, setHotelsRating] = useState(0);
    const [seachActive, setSeachActive] = useState(false);

    async function fetchDestinationList() {
        const resp = await fetch('./static/serverData/db.json');
        const data = await resp.json();
        return setDestinationList(data.destination);
    }

    
    const navigate = useNavigate();

    const handleSearch = () => {
        const selectedDestination = destinationList.find(dest => dest.label === selectedCity);

        if (selectedDestination) {
            const searchParams = new URLSearchParams({ // формуємо URL для сторінки готелів, додаючи місто як параметр запиту
                city: selectedDestination.label.toLowerCase(),
                checkIn: checkInDate,
                checkOut: checkOutDate,
                adults: numbAdults,
                children: numbChildren,
                rating: hotelsRating.toString()
            }); 

            navigate(`/hotels?${searchParams.toString()}`); // редирект
        } else {
            alert("Не вдалося знайти вибраний напрямок.");
        }
    };

    useEffect(() => {
        if(selectedCity && checkInDate && checkOutDate) {
            setSeachActive(true);
        }
    }, [selectedCity, checkInDate, checkOutDate])
    
    useEffect(() => {
        fetchDestinationList();
    }, [])

    return (
        <div className="hotels-filter">
            <select
                id="city-select"
                value={selectedCity}
                onChange={(event) => {setSelectedCity(event.target.value)}}
                style={{ padding: '5px' }}
            >
            <option value="">Виберіть місто</option>

                {destinationList.map(({value, label }) => (
                    <option key={value}>{label}</option>
                ))}
            </select>

            <div>
                <label htmlFor="checkin-date" style={{ display: 'block', marginBottom: '5px' }}>Дата заїзду:</label>
                <input
                    type="date"
                    id="checkin-date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]} 
                    style={{ padding: '4px' }}
                />
            </div>

            <div>
                <label htmlFor="checkout-date" style={{ display: 'block', marginBottom: '5px' }}>Дата виїзду:</label>
                <input
                    type="date"
                    id="checkout-date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    min={checkInDate || new Date().toISOString().split('T')[0]} // Мінімальна дата - дата заїзду
                    disabled={!checkInDate} 
                    style={{ padding: '4px' }}
                />
            </div>

            <div>
                <label htmlFor="numb-adults" style={{ display: 'block', marginBottom: '5px' }}>Кількість тварин:</label>
                <input
                    type="number"
                    id="numb-adults"
                    min="0"
                    max="10"
                    value={numbAdults}
                    onChange={(e) => setNumbAdults(e.target.value)}
                    style={{ padding: '4px' }}
                />
            </div>

            <div>
                <label htmlFor="numb-children" style={{ display: 'block', marginBottom: '5px' }}>Кількість дітей:</label>
                <input
                    type="number"
                    id="numb-children"
                    value={numbChildren}
                    min="0"
                    max="20"
                    onChange={(e) => setNumbChildren(e.target.value)}
                    style={{ padding: '4px' }}
                />
            </div>

            <div>
                <label htmlFor="hotels-rating" style={{ display: 'block', marginBottom: '5px' }}>Мінімальний рейтинг готелю</label>
                <input
                    type="number"
                    id="hotels-rating"
                    value={hotelsRating}
                    min="0"
                    max="5"
                    step="0.5"
                    onChange={(e) => setHotelsRating(e.target.value)}
                    style={{ padding: '4px' }}
                />
            </div>
    
            <button
                onClick={handleSearch}
                disabled={!seachActive}
                style={{ padding: '5px 10px' }}
            >
                ok
            </button>
      </div>
    )
}