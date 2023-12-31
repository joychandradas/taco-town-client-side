import React from 'react';
import Header from '../pages/Shared/Header/Header';
import Footer from '../pages/Shared/Footer/Footer';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Main = () => {
    return (
        <div>
            <Header />
            <div style={{minHeight: "calc(100vh - 265px)"}}><Outlet /></div>
            <Footer />
            <ToastContainer theme="colored" />
        </div>
    );
};

export default Main;