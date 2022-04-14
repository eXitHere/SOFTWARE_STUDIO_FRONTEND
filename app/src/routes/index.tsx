import { BrowserRouter, RouteObject, useRoutes } from 'react-router-dom'

import { Blog, MainBlogs, Home, EditProfile, CreateBlog, Profile } from 'routes/lazy'
import { Path } from 'routes/path'

import NotFound from 'pages/404'

const routes: RouteObject[] = [
  {
    path: Path.Home,
    children: [
      { index: true, element: <Home /> },
      {
        path: Path.Profile,
        children: [{ index: true, element: <Profile/> }],
      },
      {
        path: Path.MainBlogs,
        children: [
          { index: true, element: <MainBlogs /> },
          { path: `${Path.MainBlogs}/:id`, element: <Blog /> },
        ],
      },
      {
        path: Path.EditProfile,
        children: [{ index: true, element: <EditProfile /> }],
      },
      {
        path: Path.CreateBlog,
        children: [{ index: true, element: <CreateBlog /> }],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]

export { Path }

const Routes = () => {
  return useRoutes(routes)
}

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
)
