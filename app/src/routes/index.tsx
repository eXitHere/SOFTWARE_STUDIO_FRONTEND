import { BrowserRouter, RouteObject, useRoutes } from 'react-router-dom'
import { Blog, Blogs, Home } from 'routes/lazy'
import NotFound from 'pages/404'

const routes: RouteObject[] = [
  {
    path: '/',
    children: [
      { index: true, element: <Home /> },
      {
        path: '/blogs',
        children: [
          { index: true, element: <Blogs /> },
          { path: '/blogs/:id', element: <Blog /> },
        ],
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
