import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import moment from 'moment';
import UserStats from './userStats';
import PostStats from './postStats';
import { listUser } from '../../api/user';
import { listBlog } from '../../api/blog';

function Home() {
    useEffect(async () => {
        const users = await listUser();

        const _users = _.chain(users)
            .groupBy('role')
            .map((value, key) => ({ [key]: value.length }))
            .value();

        let blogs = await listBlog();
        blogs = blogs.blogs;
        let _blogs = [];

        blogs.map((e) => {
            return e.category.map((_e) => {
                if (!_blogs[_e]) {
                    _blogs[_e] = [];
                }

                _blogs[_e].push(e);
            });
        });

        setData({
            users: { ..._users[0], ..._users[1] },
            posts: _blogs,
            postsCount: blogs.length,
        });
    }, []);

    const [data, setData] = useState(null);

    return (
        <div className="p-5 space-y-4">
            <UserStats data={data} />
            <PostStats data={data} />
        </div>
    );
}

export default Home;
