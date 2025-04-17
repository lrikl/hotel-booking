'use strict';
import React from 'react';
import { NavLink } from "react-router-dom";
import { menuItems } from '../../index.js';
import "./headerMenu.scss";

export default () => {

    return (
        <div className="header">

            <nav className="header-menu">
                {menuItems.map(({path, textNav}) => (
                    <NavLink key={path} className="header-menu-item" to={path}>
                        {textNav}
                    </NavLink>
                ))}
            </nav>

        </div>
    );
};
