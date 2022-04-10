import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/sidebar';

function Layout() {
    return (
        <>
            <Sidebar />
            <div className="h-screen w-screen bg-primary flex justify-center items-center">
                <Outlet />
            </div>
        </>
    );
}

export default Layout;
