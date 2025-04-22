import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header/header.js'; 
import Footer from './footer/footer.js';  
import ErrorBoundary from './ErrorBoundary.js'; 
import ThemeProvider from './ThemeProvider.js';


const Layout = () => {
    return (
        <ErrorBoundary>
            <ThemeProvider>
                <div className="container">
                    <Header />
                    <main className="main-content"> 
                        <Outlet />
                    </main>
                    <Footer />
                </div>
            </ThemeProvider>
        </ErrorBoundary>
    );
};

export default Layout;