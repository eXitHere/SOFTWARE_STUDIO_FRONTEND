import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import moment from 'moment'
import { listBlog, toggleHiddenBlog, deleteBlog } from '../../api/blog'
import Loader from '../../components/loader'

function List({ columns, data, sortHandler, sortBy, fetchAll }) {
  const handleHiding = (e) => {
    const id = e.target.id
    Swal.fire({
      title: 'ยืนยันการซ่อนกระทู้ ?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'ยืนยัน',
      denyButtonText: `ยกเลิก`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const status = await toggleHiddenBlog(id)
        if (status) {
          await fetchAll()
          Swal.fire({
            title: 'Success!',
            icon: 'success',
            confirmButtonText: 'Close',
          })
        } else {
          Swal.fire({
            title: 'Error!',
            icon: 'error',
            confirmButtonText: 'Close',
          })
        }
      }
    })
  }

  const handleDelete = (e) => {
    const id = e.target.id
    Swal.fire({
      title: 'ยืนยันการลบกระทู้ ?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'ยืนยัน',
      denyButtonText: `ยกเลิก`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const status = await deleteBlog(id)
        if (status) {
          await fetchAll()
          Swal.fire({
            title: 'Success!',
            icon: 'success',
            confirmButtonText: 'Close',
          })
        } else {
          Swal.fire({
            title: 'Error!',
            icon: 'error',
            confirmButtonText: 'Close',
          })
        }
      }
    })
  }

  return (
    <table className="table-fixed w-full shadow-md bg-white rounded text-sm text-left text-gray-500 ">
      <thead className="h-12 text-xl bg-gray-50 rounded-lg text-gray-700 uppercase ">
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
            <span className="sr-only">Delete</span>
          </th>
          <th scope="col" className="px-6 py-3">
            <span className="sr-only">View</span>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-300">
        {data.map((blog, idx) => (
          <tr key={idx} className="odd:bg-white even:bg-gray-50 ">
            <td className="px-6 py-4 font-bold">{blog.topic}</td>
            <td className="px-6 py-4 text-center">{blog.category.join(', ')}</td>
            <td className="px-6 py-4 text-center">{blog.like}</td>
            <td className="px-6 py-4 text-center">{moment(blog.updated_date).format('MMMM Do YYYY, h:mm:ss a')}</td>
            <td className="px-6 py-4 text-center">
              <button
                id={blog.blog_id}
                onClick={(e) => handleHiding(e)}
                className={`w-20 p-4 text-white ${!blog.hide ? 'bg-green-400' : 'bg-gray-400'} rounded-xl`}
              >
                {!blog.hide ? 'Show' : 'Hide'}
              </button>
              {/* {JSON.stringify(blog, 2, null)} */}
            </td>
            <td className="px-6 py-4 text-right">
              <button
                id={blog.blog_id}
                className={`w-20 p-4 text-white ${!blog.deleted ? 'bg-red-400' : 'bg-gray-400'} rounded-xl`}
                onClick={(e) => handleDelete(e)}
                disabled={blog.deleted === true}
              >
                {blog.deleted ? 'Deleted' : 'Delete'}
              </button>
            </td>
            <td className="px-6 py-4 text-right">
              <a
                href={`https://www.google.com/blogs/${blog.blog_id}`}
                target="_blank"
                className="font-medium text-blue-600 hover:underline"
              >
                View
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function View() {
  const [blogs, setBlogs] = useState([])
  const [focusBlogs, setFocusBlogs] = useState([])
  const [sortBy, setSortBy] = useState({
    key: 'topic',
    state: true,
  })
  const [filter, setFilter] = useState('')
  const [page, setPage] = useState(1)
  const [paramID, setParamID] = useState(null)
  const search = useLocation().search
  const perPage = 7

  useEffect(() => {
    setFocusBlogs(blogs.slice(perPage * (page - 1), perPage * page))
  }, [blogs, page])

  useEffect(() => {
    const sorted = []
      .concat(blogs)
      .sort((a, b) =>
        sortBy.state
          ? a[sortBy.key] > b[sortBy.key]
            ? 1
            : -1
          : a[sortBy.key] < b[sortBy.key]
          ? 1
          : -1 && a['deleted'] > b['deleted']
          ? 1
          : -1,
      )

    // console.log(blogs.length)
    setBlogs(sorted)
  }, [sortBy])

  useEffect(() => {
    if (filter.length) {
      const filtered = blogs.filter(
        (e) => e.topic.includes(filter) || e.category.join(', ').includes(filter) || e.blog_id === paramID,
      )
      setFocusBlogs(filtered)
    } else {
      setFocusBlogs(blogs.slice(perPage * (page - 1), perPage * page))
    }
  }, [filter])

  const sortHandler = (e) => {
    const id = e.target.id
    if (sortBy.key !== id) {
      setSortBy({
        key: id,
        state: false,
      })
    } else {
      setSortBy({
        key: id,
        state: !sortBy.state,
      })
    }
  }

  const firstPage = () => {
    return page > 1
  }

  const lastPage = () => {
    return page < blogs.length / perPage
  }

  const pageUp = () => {
    if (lastPage()) setPage(page + 1)
    setFilter('')
  }

  const pageDown = () => {
    if (firstPage()) setPage(page - 1)
    setFilter('')
  }

  const getBlogById = (id) => {
    return blogs.find((e) => e.blog_id === id)
  }

  useEffect(async () => {
    await fetchAll()

    const id = new URLSearchParams(search).get('id')
    if (id) setParamID(id)
  }, [])

  useEffect(() => {
    if (paramID && blogs.length) {
      // console.log('searching', paramID, blogs.length)
      const findBlogs = getBlogById(paramID)
      if (findBlogs) {
        // console.log(findBlogs)
        setFilter(findBlogs.blog_id)
      }
    }
  }, [paramID, blogs])

  const fetchAll = async () => {
    const tmp = await listBlog()
    const _blogs = tmp.blogs
    const sorted = _blogs.sort((a, b) => (a['deleted'] > b['deleted'] ? 1 : -1))
    setBlogs(sorted)
  }

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
      accessor: 'updated_date',
    },
    {
      Header: 'Visibility',
      accessor: 'hide',
    },
  ]

  return (
    <div className="p-5 w-full">
      <div className="p-4">
        <div className="flex flex-row justify-between">
          <div>
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500"
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  "
                placeholder="Search from topic or category"
                onChange={(e) => {
                  setFilter(e.target.value)
                }}
                value={filter}
              />
            </div>
          </div>
          <div className="flex flex-row items-center">
            <div className="flex justify-center w-24">
              {focusBlogs.length + perPage * (page - 1)} of {filter.length ? focusBlogs.length : blogs.length}
            </div>
            <div className="flex justify-center w-full text-white space-x-2">
              <button
                className={`right-0 w-24 p-2 m-2 mr-0 font-bold  rounded-sm ${
                  firstPage() === false ? 'bg-gray-300' : 'bg-red-500'
                }`}
                onClick={() => {
                  pageDown()
                }}
                disabled={firstPage() === false}
              >
                prev
              </button>

              <button
                className={`right-0 w-24 p-2 m-2 mr-0 font-bold  rounded-sm ${
                  lastPage() === false ? 'bg-gray-300' : 'bg-green-500'
                }`}
                onClick={() => {
                  pageUp()
                }}
                disabled={lastPage() === false}
              >
                next
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-auto">
        {focusBlogs.length ? (
          <List
            className=""
            data={focusBlogs}
            columns={columns}
            sortHandler={sortHandler}
            sortBy={sortBy}
            fetchAll={fetchAll}
          />
        ) : (
          <Loader />
        )}
      </div>
    </div>
  )
}

export default View
