'use strict';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route  } from "react-router-dom"; 

import ErrorBoundary from "./components/ErrorBoundary.js";
import Header from './components/header/header.js';
import Footer from './components/footer/footer.js';

import './style.scss';

export const menuItems = [
    { path: '/', textNav: 'Home', component: <div>Home</div> },
    { path: '/about', textNav: 'About', component: <div>About</div> },
    { path: '/hotels', textNav: 'Hotels', component: <div>Hotels</div>}
];

const MainContent = () => { 
    return (
        <div className="main-content">
            <Routes>
                {menuItems.map(({ path, component }, index) => (
                    <Route key={index} path={path} element={component} /> 
                ))}
            </Routes>
        </div>
    );
};

const RootComponent = () => {
    return (
        <ErrorBoundary>
            <HashRouter>
                    <Header />
                    <MainContent />
                    <Footer />
            </HashRouter>
        </ErrorBoundary>
    );
};


const rootNodeElement = document.querySelector('#main');
const root = ReactDOM.createRoot(rootNodeElement);
root.render(<RootComponent />);