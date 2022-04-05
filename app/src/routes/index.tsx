import { BrowserRouter, RouteObject, useRoutes } from 'react-router-dom'
import { Blog, MainBlogs, Home, EditProfile, CreateBlog } from 'routes/lazy'
import NotFound from 'pages/404'

const routes: RouteObject[] = [
  {
    path: '/',
    children: [
      { index: true, element: <Home /> },
      {
        path: '/mainBlogs',
        children: [
          { index: true, element: <MainBlogs /> },
          { path: '/mainBlogs/:id', element: <Blog /> },
        ],
      },
      {
        path: '/editProfile',
        children: [{ index: true, element: <EditProfile /> }],
      },
      {
        path: '/createBlog',
        children: [{ index: true, element: <CreateBlog/> }],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]

const Routes = () => {
  return useRoutes(routes)
}

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
)
