import React from 'react';
// import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar/sidebar';
// import NavBar from './navbar/navbar';

const Layout = () => {
    return (
        <div className="w-100 h-100">
            <Sidebar />
            <div className="content flex-grow-1">
                {/* <NavBar /> */}
                <div className="flex-grow-1 d-flex flex-column">
                    <div class="container-fluid content-main pb-3">
                        {/* <Outlet /> */}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Layout;
