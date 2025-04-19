import React, { useState, useEffect } from "react";

import "./hotels.scss";

export default () => {

    const [hotelsData, setHotelsData] = useState([])

    async function fetchData() {
        const resp = await fetch('./static/serverData/db.json')
        const data = await resp.json();
        setHotelsData(data.hotels);
        console.log(data)
    }

    useEffect(() => {
        fetchData()
    }, [])


    return (
       <ul className="hotels-list">
            {hotelsData.map(({id, name, address, city}) => (
                <li key={id} className="hotels-li">
                    <div>Hotel: {name}</div>
                    <div>address: {address}</div>
                    <div>city: {city}</div>
                </li>
            ))}

       </ul>
    )
}