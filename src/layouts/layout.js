import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar/sidebar';
import NavBar from './navbar/navbar';
import { useAuthService } from '../services/authservice';
import { useSidebarService } from '../services/sidebarservice';

const Layout = () => {
    const { isLoggedIn } = useAuthService();
    const { isOpen } = useSidebarService();

    return (
        <div className="w-100 h-100">
            <Sidebar />
            <NavBar />
            <div className="flex-grow-1 d-flex flex-column">
                <div className={
                    `container-fluid content-main pb-2 ` +
                    (isLoggedIn() ? 'navbar-opened ' : '') +
                    (isLoggedIn() && isOpen ? 'sidenav-opened' : '')
                }
                >
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
export default Layout;
