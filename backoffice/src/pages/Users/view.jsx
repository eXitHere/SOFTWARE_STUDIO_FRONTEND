import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import { listUser } from '../../api/user';

function StatusButton({ currentStatus }) {
    return <td className="px-6 py-4">{currentStatus}</td>;
}

function List({ columns, data }) {
    return (
        <table className="table-auto w-full shadow-md bg-white rounded text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="h-12 text-xl bg-gray-50 rounded-lg text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    {columns.map((col, idx) => (
                        <th
                            className="px-6 py-3 text-left font-bold"
                            key={idx}
                            scope="col"
                        >
                            {col.Header}
                        </th>
                    ))}
                    <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Edit</span>
                    </th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
                {data.map((user, idx) => (
                    <tr
                        key={idx}
                        className="dark:text-white border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700"
                    >
                        <td className="px-6 py-4">
                            <Avatar size="4vh" name={user.name} />
                            <span className="pl-2">
                                {user.name || 'ไม่ได้กำหนด'}
                            </span>
                        </td>
                        <td className="px-6 py-4">{user.username}</td>
                        <StatusButton
                            currentStatus={user.banned ? 'active' : 'banned'}
                        />
                        <td className="px-6 py-4">{user.role}</td>
                        <td className="px-6 py-4 text-right">
                            <a
                                href={`/users/${user.id}`}
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                                Edit
                            </a>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

function Users() {
    const [users, setUsers] = useState([]);
    const [focusUsers, serFocusUser] = useState([]);
    const [page, setPage] = useState(1);
    const perPage = 9;

    useEffect(() => {
        serFocusUser(users.slice(perPage * (page - 1), perPage * page));
        // console.log(perPage * (page - 1), perPage * page);
    }, [page]);

    useEffect(() => {
        serFocusUser(users.slice(perPage * (page - 1), perPage * page));
    }, [users]);

    const pageUp = () => {
        if (page < users.length / perPage) setPage(page + 1);
    };

    const pageDown = () => {
        if (page > 1) setPage(page - 1);
    };

    useEffect(async () => {
        // const users = await listUser();
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
        setUsers(users);
    }, []);

    const columns = [
        {
            Header: 'Name',
            accessor: 'name',
        },
        {
            Header: 'Username',
            accessor: 'username',
        },
        {
            Header: 'Status',
            accessor: 'status',
        },
        {
            Header: 'Role',
            accessor: 'role',
        },
    ];

    return (
        <div className="p-5 h-full">
            <div className="p-4">
                <label htmlFor="table-search" className="sr-only">
                    Search
                </label>
                <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="table-search"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search htmlFor items"
                    />
                </div>
            </div>
            <div className="overflow-auto h-4/5">
                <List className="" data={focusUsers} columns={columns} />
            </div>
            <div className="flex justify-center">
                {focusUsers.length + perPage * (page - 1)} of {users.length}
            </div>
            <div className="flex justify-center w-full text-white space-x-2">
                <button
                    className="right-0 w-32 p-4 m-4 mr-0 font-bold  bg-red-500 rounded-xl"
                    onClick={() => {
                        pageDown();
                    }}
                >
                    prev
                </button>

                <button
                    className="left-0 w-32 p-4 m-4 ml-0 font-bold  bg-green-400 rounded-xl"
                    onClick={() => {
                        pageUp();
                    }}
                >
                    next
                </button>
            </div>
        </div>
    );
}
export default Users;
