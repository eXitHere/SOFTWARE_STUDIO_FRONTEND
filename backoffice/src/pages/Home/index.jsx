import React, { useEffect, useState } from 'react';
import UserStats from './userStats';
import PostStats from './postStats';

function Home() {
    const [data, setData] = useState({
        users: {
            admin: 30,
            user: 10,
        },
        posts: {
            sum: 30,
            normal: 15,
            deleted: 10,
            hidden: 5,
        },
    });

    return (
        <div className="p-5 space-y-4">
            <UserStats data={data} />
            <PostStats data={data} />
        </div>
    );
}

export default Home;
