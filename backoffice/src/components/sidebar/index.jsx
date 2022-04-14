import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';
import { FaHome, FaUsers, FaBook } from 'react-icons/fa';

// https://react-icons.github.io/react-icons/icons?name=fa

function Button({ icon, text, to }) {
    return (
        <Link
            to={to}
            className="w-full text-center p-5 hover:cursor-pointer hover:opacity-90 inline-flex items-center"
        >
            {icon}
            <span className="ml-2 font-bold text-xl">{text}</span>
        </Link>
    );
}

function Sidebar() {
    const nav = [
        { icon: <FaHome />, text: 'Home', to: '/' },
        { icon: <FaUsers />, text: 'Users', to: '/users' },
        { icon: <FaBook />, text: 'Blogs', to: '/blogs' },
    ];

    const user = {
        name: 'kookzaza',
    };

    return (
        <div className="divide-y rounded-r-xl top-0 left-0 w-[20vw] bg-primary p-2 text-white h-full ">
            <div className="flex justify-center p-5 flex-col">
                <div className="flex justify-center">
                    <Avatar name={user.name} />
                </div>
                <div className="pt-5 font-bold text-xl">{user.name}</div>
                <div className="opacity-50">admin</div>
            </div>
            {/* Buttons */}
            <div className="pt-5 space-y-2">
                {nav.map((e, idx) => (
                    <Button key={idx} {...e} />
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
