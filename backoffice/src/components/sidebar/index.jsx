import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import MiniLotus from '../../assets/images/mini_lotus.png';
// https://react-icons.github.io/react-icons/icons?name=fa

function Button({ icon, text, to, isOpen }) {
    return (
        <NavLink
            activelassname="active"
            to={to}
            className={`pb-8 pt-8 h-12 flex flex-row hover:cursor-pointer hover:opacity-90 hover:bg-slate-400 items-center text-xl ${
                !isOpen ? 'justify-center' : 'pl-4'
            }`}
        >
            {isOpen ? (
                <span className="ml-2 truncate">
                    <i className={icon} aria-hidden="true" />
                    <span className="ml-2">{text}</span>
                </span>
            ) : (
                <i className={icon} aria-hidden="true" />
            )}
        </NavLink>
    );
}

function Sidebar() {
    const [isOpen, setOpen] = useState(false);

    const nav = [
        { icon: 'fa fa-home', text: 'Home', to: 'backoffice/' },
        { icon: 'fa fa-users', text: 'Users', to: 'backoffice/users' },
        { icon: 'fa fa-comments', text: 'Blogs', to: 'backoffice/blogs' },
        {
            icon: 'fa fa-bullhorn',
            text: 'Announce',
            to: 'backoffice/announcements',
        },
    ];

    const openSidenav = () => {
        setOpen(true);
    };

    const closeSidenav = () => {
        setOpen(false);
    };

    return (
        <div
            onMouseLeave={closeSidenav}
            onMouseEnter={openSidenav}
            className={`h-full bg-primary w-1/4 top-0 left-0 transition-all pt-4 flex flex-col items-center fixed z-10 ${
                isOpen && isOpen === true ? 'w-60' : 'w-16'
            }`}
        >
            <div className="flex justify-center items-center p-4 mt-4 h-12 mb-10 w-full">
                {isOpen && (
                    <a
                        className="text-center inline-flex items-center flex-row hover:cursor-pointer hover:opacity-90 "
                        href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                        target="_blank"
                    >
                        <img src={MiniLotus} className="w-16 h-16 mr-4" />
                        <span className="text-4xl items-center text-white">
                            ADMIN
                        </span>
                    </a>
                )}
            </div>
            <div className="divide-y bg-primary text-white w-full h-full flex flex-col">
                {nav.map((e, idx) => (
                    <Button isOpen={isOpen} key={idx} {...e} />
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
