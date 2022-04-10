import React from 'react';

function Stats() {
    return <div>Stats User</div>;
}

function List() {
    return <div>List User</div>;
}

function Users() {
    return (
        <div>
            <Stats />
            <List />
        </div>
    );
}

export default Users;
