import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigateTo = useNavigate();

    useEffect(() => {
        localStorage.clear();
        navigateTo('/login');
        // window.location.reload();
    }, []);

    return <div>Logout...</div>;
}

export default Logout;
