'use strict';
import React from 'react';
import { NavLink } from "react-router-dom";
import { menuItems } from '../../index.js';
import "./headerMenu.scss";

export default () => {

    const navItems = menuItems.filter(item => item.isMenuItem === true);

    return (
        <div className="header">
            <nav className="header-menu">
                {navItems.map(({ path, textNav, index }) => (
                    <NavLink key={path} className="header-menu-item" to={path} end={index}> {/* 'end' prop важливий для NavLink на головній сторінці ('/'), щоб він не був активним на інших шляхах */}
                        {textNav}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};
