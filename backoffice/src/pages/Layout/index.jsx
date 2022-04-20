import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/sidebar';

function Layout() {
    return (
        <div className="h-screen w-screen bg-white flex justify-center">
            <Sidebar />
            <div className="w-full h-full">
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;
