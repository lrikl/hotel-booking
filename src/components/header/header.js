'use strict';
import React from 'react';
import { NavLink, useLocation  } from "react-router-dom";
import { menuItems } from '../../index.js';
import "./headerMenu.scss";

export default () => {

    const location = useLocation();
    const currentPathname = location.pathname;

    const navItems = menuItems.filter(item => item.isMenuItem === true || (item.path === '/hotels' && currentPathname === '/hotels'));

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
