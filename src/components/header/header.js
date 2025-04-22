'use strict';
import React from 'react';
import { Link, NavLink, useLocation  } from "react-router-dom";
import { menuItems } from '../../index.js';
import {
    Toolbar,
    Tab,
    Box,
    Tabs
} from '@mui/material';

import "./header.scss";

export default () => {

    const location = useLocation();
    const currentPathname = location.pathname;

    const navItems = menuItems.filter(item => item.isMenuItem === true || (item.path === '/hotels' && currentPathname === '/hotels'));
    const currentPath = menuItems.find(item => item.path === location.pathname) ? location.pathname : false;

    return (
        <Box className="header" component="header">
            <Link to="/" className='logo-block-link'>
                <div className='logo-round'></div>
                <h2 className='logo-title'>Booking</h2>
            </Link>

            <Toolbar sx={{ px: { xs: 0, sm: 0 } }}>
                <Box component="nav" sx={{ flexGrow: 1, overflow: 'visible' }}>
                    <Tabs
                        value={currentPath}
                        aria-label="primary navigation tabs"
                        indicatorColor="primary"
                        sx={{
                            overflow: 'unset',
                            '.MuiTabs-indicator': {
                                display: 'none',
                            },
                            '& .MuiTabs-flexContainer': {
                                gap: '12px',
                                justifyContent: { xs: 'center', sm: 'flex-start' },
                            },
                            '.MuiTabs-scroller': {
                                overflow: 'visible !important',
                            }
                        }}
                    >
                        {navItems.map(({textNav, path}) => (
                            <Tab
                                key={path}
                                label={textNav}
                                value={path} 
                                component={NavLink}
                                to={path}
                                end={path === '/'}  // 'end' prop важливий для NavLink на головній сторінці ('/'), щоб він не був активним на інших шляхах 
                                sx={(theme) => ({
                                    backgroundColor: '#fc9703',
                                    color: theme.palette.mode === 'dark' ? '#000000' : '#FFFFFF',
                                    borderRadius: '4px', 
                                    padding: '12px 16px', 
                                    minHeight: 'auto', 
                                    minWidth: 'auto', 
                                    opacity: 1, 
                                    textTransform: 'uppercase', 
                                    fontWeight: 'bold', 
                                    boxShadow: '3px 3px 3px 0px rgba(0,0,0,0.2)', 
                                    transition: 'background-color 0.3s ease, box-shadow 0.3s ease', 

                                    '&:hover': { 
                                        backgroundColor:'rgb(220, 130, 0)', 
                                    },

                                    '&.Mui-selected': {
                                        backgroundColor:'rgb(255, 179, 64)', 
                                        color: theme.palette.mode === 'dark' ? '#000000' : '#FFFFFF',
                                    },

                                     '@media (max-width:767px)': {
                                        fontSize: '14px', 
                                        width: { xs: '100%', sm: 'auto'}, 
                                        maxWidth: { xs: '280px', sm: 'none' } 
                                    }
                                })}
                            />
                        ))}
                    </Tabs>
                </Box>
            </Toolbar>
        </Box>
    );
};
