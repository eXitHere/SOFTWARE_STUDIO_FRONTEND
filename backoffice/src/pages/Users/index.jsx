import React from 'react';
import Avatar from 'react-avatar';

function StatusButton({ currentStatus }) {
    return <td className="p-4">{currentStatus}</td>;
}

function List({ columns, data }) {
    return (
        <table className="table-auto w-full shadow-md bg-white rounded">
            <thead className="h-12 text-xl bg-gray-50 rounded-lg text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    {columns.map((col, idx) => (
                        <th className="p-4 text-left font-bold" key={idx}>
                            {col.Header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
                {data.map((user, idx) => (
                    <tr key={idx}>
                        <td className="p-4">
                            <Avatar size="4vh" name={user.name} />
                            <span className="pl-2">{user.name}</span>
                        </td>
                        <td className="p-4">{user.email}</td>
                        <StatusButton currentStatus={user.status} />
                        <td className="p-4">{user.role}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

function Users() {
    const columns = [
        {
            Header: 'Name',
            accessor: 'name',
        },
        {
            Header: 'Email',
            accessor: 'email',
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

    const data = [
        {
            name: 'Jane Cooper',
            email: 'jane.cooper@example.com',
            title: 'Regional Paradigm Technician',
            department: 'Optimization',
            status: 'Active',
            role: 'Admin',
            imgUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
        },
        {
            name: 'Cody Fisher',
            email: 'cody.fisher@example.com',
            title: 'Product Directives Officer',
            department: 'Intranet',
            status: 'Inactive',
            role: 'Admin',
            imgUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
        },
        {
            name: 'Esther Howard',
            email: 'esther.howard@example.com',
            title: 'Forward Response Developer',
            department: 'Directives',
            status: 'Active',
            role: 'Member',
            imgUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
        },
        {
            name: 'Jenny Wilson',
            email: 'jenny.wilson@example.com',
            title: 'Central Security Manager',
            department: 'Program',
            status: 'Offline',
            role: 'Member',
            imgUrl: 'https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
        },
        {
            name: 'Kristin Watson',
            email: 'kristin.watson@example.com',
            title: 'Lean Implementation Liaison',
            department: 'Mobility',
            status: 'Inactive',
            role: 'Admin',
            imgUrl: 'https://images.unsplash.com/photo-1532417344469-368f9ae6d187?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
        },
        {
            name: 'Cameron Williamson',
            email: 'cameron.williamson@example.com',
            title: 'Internal Applications Engineer',
            department: 'Security',
            status: 'Active',
            role: 'Member',
            imgUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
        },
    ];

    return (
        <div className="w-full p-5">
            <List className="" data={data} columns={columns} />
        </div>
    );
}

export default Users;
