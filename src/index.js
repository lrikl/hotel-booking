'use strict';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout.js'; 

import Hotels from './components/pages/hotels/hotels.js';

import './style.scss';

export const menuItems = [
    { path: '/', index: true, textNav: 'Home', component: <div>Home</div>, isMenuItem: true },
    { path: '/about', textNav: 'About', component: <div>About</div>, isMenuItem: true },
    { path: '/hotels', textNav: 'Hotels', component: <Hotels />, isMenuItem: false }
];

const router = createHashRouter([
    {
        path: "/",        
        element: <Layout />,
        children: [
            ...menuItems.map(({ path, index, component }) => ({
                index, // true для головної сторінки ('/')
                path: index ? undefined : path, // бо path не потрібний для index: true
                element: component, // компонент для рендерингу <Outlet />
            })),

            {
                path: "*",
                element: <div>404 Not Found</div>
            }
        ]
    }
]);

const rootNodeElement = document.querySelector('#main');
const root = ReactDOM.createRoot(rootNodeElement);
root.render(
    <RouterProvider router={router} />
);