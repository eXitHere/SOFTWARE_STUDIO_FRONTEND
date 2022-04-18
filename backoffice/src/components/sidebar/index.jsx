import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Avatar from 'react-avatar';
import {
    FaHome,
    FaUsers,
    FaBook,
    FaBullhorn,
    FaSignOutAlt,
} from 'react-icons/fa';
import { getUserInfo } from '../../utils/user.utils';

// https://react-icons.github.io/react-icons/icons?name=fa

function Button({ icon, text, to }) {
    return (
        <NavLink
            activelassname="active"
            to={to}
            className="h-12 flex flex-row hover:cursor-pointer hover:opacity-90 hover:bg-slate-400"
        >
            <div className="text-center inline-flex items-center">
                {/* {icon} */}
                <span className="ml-2 items-center truncate">{text}</span>
            </div>
        </NavLink>
    );
}

function Sidebar() {
    const [user, setUser] = useState({
        name: 'unknown',
        role: 'unknown',
    });

    useEffect(async () => {
        const tmp = await getUserInfo();
        setUser(tmp);
    }, []);

    const nav = [
        { icon: <FaHome />, text: 'Home', to: '/' },
        { icon: <FaUsers />, text: 'Users', to: '/users' },
        { icon: <FaBook />, text: 'Blogs', to: '/blogs' },
        { icon: <FaBullhorn />, text: 'Announce', to: '/announcements' },
    ];

    const logoutNav = {
        icon: <FaSignOutAlt />,
        text: 'logout',
        to: '/logout',
    };

    return (
        <div className="divide-y top-0 left-0 w-[20vw] bg-primary p-2 text-white h-full ">
            <div className="flex justify-center p-5 flex-col">
                <div className="flex justify-center">
                    <Avatar name={user.display_name} />
                </div>
                <div className="pt-5 font-bold text-xl">
                    {user.display_name}
                </div>
                <div className="opacity-50">{user.role}</div>
            </div>
            {/* Buttons */}
            <div className="pt-5 flex flex-col space-y-4">
                {nav.map((e, idx) => (
                    <Button key={idx} {...e} />
                ))}
                <div className="text-red-800">
                    <Button {...logoutNav} />
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
