import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/sidebar';

function Layout() {
    return (
        <div className="h-screen w-screen bg-primary flex justify-center items-center">
            <Sidebar />
            <div className="w-full">
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;
