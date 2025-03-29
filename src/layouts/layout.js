import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar/sidebar';
import NavBar from './navbar/navbar';

const Layout = () => {
    return (
        <div className="w-100 h-100">
            <Sidebar />
            <NavBar />
            <div className="flex-grow-5 d-flex flex-column">
                <div className="container-fluid content-main pb-2 sidenav-opened navbar-opened">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
export default Layout;
