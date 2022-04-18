import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { listBlog } from '../../api/blog';
import Loader from '../../components/loader';

function HideShowButton({ state, setState }) {
    return (
        <button
            className={`w-20 p-4 text-white ${
                state ? 'bg-green-400' : 'bg-gray-400'
            } rounded-xl`}
        >
            {state ? 'Show' : 'Hide'}
        </button>
    );
}

function DeleteButton({ state, setState }) {
    return (
        <button className="w-18 p-4 bg-red-400 text-white rounded-xl">
            Delete
        </button>
    );
}

function List({ columns, data, sortHandler, sortBy }) {
    return (
        <table className="table-auto w-full shadow-md bg-white rounded text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="h-12 text-xl bg-gray-50 rounded-lg text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    {columns.map((col, idx) => (
                        <th
                            scope="col"
                            className="px-6 py-3 font-bold hover:cursor-pointer select-none text-center "
                            key={idx}
                            id={col.accessor}
                            onClick={(e) => sortHandler(e)}
                        >
                            {col.Header}
                            {sortBy.key === col.accessor ? (
                                sortBy.state ? (
                                    <i className="ml-2 fa fa-angle-down" />
                                ) : (
                                    <i className="ml-2 fa fa-angle-up" />
                                )
                            ) : (
                                <i />
                            )}
                        </th>
                    ))}
                    <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Edit</span>
                    </th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
                {data.map((blog, idx) => (
                    <tr
                        key={idx}
                        className="dark:text-white border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700"
                    >
                        <td className="px-6 py-4 font-bold">
                            {blog.topic} {idx}
                        </td>
                        <td className="px-6 py-4">
                            {blog.category.join(', ')}
                        </td>
                        <td className="px-6 py-4">{blog.like}</td>
                        <td className="px-6 py-4">
                            {moment(blog.updated_date).format(
                                'MMMM Do YYYY, h:mm:ss a',
                            )}
                        </td>
                        <td className="px-6 py-4">
                            <HideShowButton />
                        </td>
                        <td className="px-6 py-4 text-right">
                            <DeleteButton />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

function View() {
    const [blogs, setBlogs] = useState([]);
    const [focusBlogs, setFocusBlogs] = useState([]);
    const [sortBy, setSortBy] = useState({
        key: 'topic',
        state: true,
    });
    const [filter, setFilter] = useState([]);
    const [page, setPage] = useState(1);
    const perPage = 6;

    useEffect(() => {
        setFocusBlogs(blogs.slice(perPage * (page - 1), perPage * page));
        // console.log(perPage * (page - 1), perPage * page);
    }, [page]);

    useEffect(() => {
        setFocusBlogs(blogs.slice(perPage * (page - 1), perPage * page));
    }, [blogs]);

    useEffect(() => {
        const sorted = focusBlogs.sort((a, b) =>
            sortBy.state
                ? a[sortBy.key] > b[sortBy.key]
                    ? 1
                    : -1
                : a[sortBy.key] < b[sortBy.key]
                ? 1
                : -1,
        );
        setFocusBlogs(sorted);
    }, [sortBy]);

    useEffect(() => {
        if (filter.length) {
            const filtered = blogs.filter(
                (e) =>
                    e.topic.includes(filter) ||
                    e.category.join(', ').includes(filter),
            );
            setFocusBlogs(filtered);
        } else {
            setFocusBlogs(blogs.slice(perPage * (page - 1), perPage * page));
        }
    }, [filter]);

    const sortHandler = (e) => {
        const id = e.target.id;
        if (sortBy.key !== id) {
            setSortBy({
                key: id,
                state: false,
            });
        } else {
            setSortBy({
                key: id,
                state: !sortBy.state,
            });
        }
    };

    const pageUp = () => {
        if (page < blogs.length / perPage) setPage(page + 1);
    };

    const pageDown = () => {
        if (page > 1) setPage(page - 1);
    };

    useEffect(async () => {
        const tmp = await listBlog();
        const _blogs = tmp.blogs;
        setBlogs(_blogs);
    }, []);

    const columns = [
        {
            Header: 'Topic',
            accessor: 'topic',
        },
        {
            Header: 'Category',
            accessor: 'category',
        },
        {
            Header: 'Like',
            accessor: 'like',
        },
        {
            Header: 'Timestamp',
            accessor: 'timestamp',
        },
        {
            Header: 'Visibility',
            accessor: 'visibility',
        },
    ];

    return (
        <div className="p-5 w-full">
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
                        placeholder="Search from topic or category"
                        onChange={(e) => {
                            setFilter(e.target.value);
                        }}
                    />
                </div>
            </div>
            <div className="overflow-auto h-4/5">
                {focusBlogs.length ? (
                    <List
                        className=""
                        data={focusBlogs}
                        columns={columns}
                        sortHandler={sortHandler}
                        sortBy={sortBy}
                    />
                ) : (
                    <Loader />
                )}
            </div>
            <div className="flex justify-center">
                {focusBlogs.length + perPage * (page - 1)} of {blogs.length}
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

export default View;
