import React from 'react';
import { Outlet } from 'react-router-dom';

function Layout() {
    return (
        <>
            <div></div>
            <div className="h-screen w-screen bg-primary flex justify-center items-center">
                <Outlet />
            </div>
        </>
    );
}

export default Layout;
