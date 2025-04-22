import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header/header.js'; 
import Footer from './footer/footer.js';  
import ErrorBoundary from './ErrorBoundary.js'; 

const Layout = () => {
    return (
        <ErrorBoundary>
            <div className="container">
                <Header />
                <main className="main-content"> 
                    <Outlet />
                </main>
                <Footer />
            </div>
        </ErrorBoundary>
    );
};

export default Layout;