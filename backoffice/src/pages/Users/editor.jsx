import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import { useNavigate, useParams } from 'react-router-dom';

function Editor() {
    const { id } = useParams();

    const [user, setUser] = useState({
        id: '625c2d2c200b32232fbf9498',
        username: 'dewey',
        password:
            '2bd208ee5ae84780edae1219d44d9e044adda4cc8b833236cbfb344a55705f66',
        name: 'Dewey',
        role: 'user',
        profile_image: null,
        banned: true,
        createdDate: '2022-04-17T15:07:24.134Z',
        updatedDate: '2022-04-17T15:07:24.134Z',
    });

    useEffect(async () => {
        const users = [
            {
                id: '625c2d2c200b32232fbf9498',
                username: 'dewey',
                password:
                    '2bd208ee5ae84780edae1219d44d9e044adda4cc8b833236cbfb344a55705f66',
                name: 'Dewey',
                role: 'user',
                profile_image: null,
                banned: true,
                createdDate: '2022-04-17T15:07:24.134Z',
                updatedDate: '2022-04-17T15:07:24.134Z',
            },
            {
                id: '625c2d26200b32232fbf9496',
                username: 'herman',
                password:
                    '2bd208ee5ae84780edae1219d44d9e044adda4cc8b833236cbfb344a55705f66',
                name: 'Herman',
                role: 'user',
                profile_image: null,
                banned: true,
                createdDate: '2022-04-17T15:07:18.501Z',
                updatedDate: '2022-04-17T15:07:18.501Z',
            },
            {
                id: '625c2d1f200b32232fbf9494',
                username: 'juan',
                password:
                    '2bd208ee5ae84780edae1219d44d9e044adda4cc8b833236cbfb344a55705f66',
                name: 'Juan',
                role: 'user',
                profile_image: null,
                banned: false,
                createdDate: '2022-04-17T15:07:11.702Z',
                updatedDate: '2022-04-17T15:07:11.702Z',
            },
            {
                id: '625c2d19200b32232fbf9492',
                username: 'alfred',
                password:
                    '2bd208ee5ae84780edae1219d44d9e044adda4cc8b833236cbfb344a55705f66',
                name: 'Alfred',
                role: 'user',
                profile_image: null,
                banned: false,
                createdDate: '2022-04-17T15:07:05.369Z',
                updatedDate: '2022-04-17T15:07:05.369Z',
            },
            {
                id: '625c2d0f200b32232fbf9490',
                username: 'leonardo',
                password:
                    '2bd208ee5ae84780edae1219d44d9e044adda4cc8b833236cbfb344a55705f66',
                name: 'Leonardo',
                role: 'user',
                profile_image: null,
                banned: false,
                createdDate: '2022-04-17T15:06:55.288Z',
                updatedDate: '2022-04-17T15:06:55.288Z',
            },
            {
                id: '625c2d07200b32232fbf948e',
                username: 'marvin',
                password:
                    '2bd208ee5ae84780edae1219d44d9e044adda4cc8b833236cbfb344a55705f66',
                name: 'Marvin',
                role: 'user',
                profile_image: null,
                banned: true,
                createdDate: '2022-04-17T15:06:47.78Z',
                updatedDate: '2022-04-17T15:06:47.78Z',
            },
            {
                id: '625c2cfc200b32232fbf948c',
                username: 'tanya',
                password:
                    '2bd208ee5ae84780edae1219d44d9e044adda4cc8b833236cbfb344a55705f66',
                name: 'Tanya',
                role: 'user',
                profile_image: null,
                banned: false,
                createdDate: '2022-04-17T15:06:36.185Z',
                updatedDate: '2022-04-17T15:06:36.185Z',
            },
            {
                id: '625c2cf5200b32232fbf948a',
                username: 'aiden',
                password:
                    '2bd208ee5ae84780edae1219d44d9e044adda4cc8b833236cbfb344a55705f66',
                name: 'Aiden',
                role: 'user',
                profile_image: null,
                banned: false,
                createdDate: '2022-04-17T15:06:29.177Z',
                updatedDate: '2022-04-17T15:06:29.177Z',
            },
            {
                id: '625c2ced200b32232fbf9488',
                username: 'admin5',
                password:
                    '805673cb01644bac26b400bf8281d06e9a959a2e2e0f41a724cd7e57ea1b6a14',
                name: 'Admin Rinraphat',
                role: 'admin',
                profile_image: null,
                banned: false,
                createdDate: '2022-04-17T15:06:21.957Z',
                updatedDate: '2022-04-17T15:06:21.957Z',
            },
            {
                id: '625c2ce8200b32232fbf9486',
                username: 'admin4',
                password:
                    '805673cb01644bac26b400bf8281d06e9a959a2e2e0f41a724cd7e57ea1b6a14',
                name: 'Admin Thanakorn',
                role: 'admin',
                profile_image: null,
                banned: false,
                createdDate: '2022-04-17T15:06:16.959Z',
                updatedDate: '2022-04-17T15:06:16.959Z',
            },
            {
                id: '625c2ce2200b32232fbf9484',
                username: 'admin3',
                password:
                    '805673cb01644bac26b400bf8281d06e9a959a2e2e0f41a724cd7e57ea1b6a14',
                name: 'Admin Thanadol',
                role: 'admin',
                profile_image: null,
                banned: false,
                createdDate: '2022-04-17T15:06:10.093Z',
                updatedDate: '2022-04-17T15:06:10.093Z',
            },
            {
                id: '625c2cdb200b32232fbf9482',
                username: 'admin2',
                password:
                    '805673cb01644bac26b400bf8281d06e9a959a2e2e0f41a724cd7e57ea1b6a14',
                name: 'Admin Thana',
                role: 'admin',
                profile_image: null,
                banned: false,
                createdDate: '2022-04-17T15:06:03.306Z',
                updatedDate: '2022-04-17T15:06:03.306Z',
            },
            {
                id: '625c2cd3200b32232fbf9480',
                username: 'admin1',
                password:
                    '805673cb01644bac26b400bf8281d06e9a959a2e2e0f41a724cd7e57ea1b6a14',
                name: 'Admin Prachya',
                role: 'admin',
                profile_image: null,
                banned: false,
                createdDate: '2022-04-17T15:05:55.74Z',
                updatedDate: '2022-04-17T15:05:55.74Z',
            },
        ];
        const user = users.find((e) => e.id === id);

        setUser(user);
    }, []);

    const navigateTo = useNavigate();

    const handleChange = (e) => {
        const va = user[e.target.id];
        if (e.target.id === 'banned') {
            setUser({
                ...user,
                banned: !user.banned,
            });
        } else {
            setUser({
                ...user,
                [e.target.id]: e.target.value,
            });
        }
    };

    const handleSubmit = () => {
        console.log('submit');
    };

    return (
        <div className="p-5">
            <div className="p-4 shadow-md flex flex-col justify-center items-center space-y-8">
                <div className="flex w-full justify-center mb-10">
                    <Avatar size="16vh" className="p-2" name={user.name} />
                    <div className="p-8 flex flex-col justify-center">
                        <div className="text-2xl font-bold">{user.name}</div>
                        <div>{user.role}</div>
                    </div>
                </div>
                <div className="flex flex-row justify-around w-3/4">
                    <div className="w-1/2">
                        <div>
                            <label>Name</label>
                        </div>
                        <input
                            id="name"
                            className="p-2 border w-3/4"
                            value={user.name}
                            onChange={handleChange}
                            type="input"
                        />
                    </div>
                    <div className="w-1/2">
                        <div>
                            <label>Username</label>
                        </div>
                        <input
                            id="username"
                            className="p-2 border w-3/4"
                            value={user.username}
                            onChange={handleChange}
                            type="input"
                        />
                    </div>
                </div>
                <div className="flex flex-row justify-around w-3/4">
                    <div className="w-1/2">
                        <div>
                            <label>Password</label>
                        </div>
                        <input
                            id="password"
                            className="p-2 border w-3/4"
                            value={user.password}
                            onChange={handleChange}
                            type="password"
                        />
                    </div>
                    <div className="w-1/2">
                        <div>
                            <label>Status</label>
                        </div>
                        <button
                            id="banned"
                            className={`p-2 border w-3/4 text-white ${
                                user.banned ? 'bg-red-400' : 'bg-green-400'
                            }`}
                            onClick={handleChange}
                        >
                            {user.banned ? 'banned' : 'normal'}
                        </button>
                    </div>
                </div>
                <div className="flex flex-row justify-center space-x-4 w-full">
                    <button
                        className={`p-4 border w-36 h-14 text-center items-center font-bold rounded-md text-white bg-green-400`}
                        onClick={handleSubmit}
                    >
                        Save Changes
                    </button>
                    <button
                        className={`p-4 border w-36 h-14 text-center items-center font-bold rounded-md text-white bg-red-400`}
                        onClick={() => {
                            navigateTo('/users');
                        }}
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Editor;
