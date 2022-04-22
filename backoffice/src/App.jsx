import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import NoPage from './pages/NotFound'
import Layout from './pages/Layout'
import Logout from './pages/Logout'
import { UserView, UserEditor } from './pages/Users'
import { View } from './pages/Blogs'
import { Announcement } from './pages/Announcements'
import { getUserInfo } from './utils/user.utils'
import isValidHttpUrl from './utils/url.utils'

function App() {
  return (
    <div className="animate-fade-in-down">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="users"
              element={
                <ProtectedRoute>
                  <UserView />
                </ProtectedRoute>
              }
            />
            <Route
              path="users/:id"
              element={
                <ProtectedRoute>
                  <UserEditor />
                </ProtectedRoute>
              }
            />
            <Route
              path="blogs"
              element={
                <ProtectedRoute>
                  <View />
                </ProtectedRoute>
              }
            />
            <Route path="announcements" element={<Announcement />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

const ProtectedRoute = ({ children }) => {
  const user = getUserInfo()
  const search = useLocation().search
  const next = new URLSearchParams(search).get('next')
  const id = new URLSearchParams(search).get('id')
  if (!user || user.role !== 'admin') {
    if (next && id && !isValidHttpUrl(next)) {
      return <Navigate to={`/login?next=${next}&id=${id}`} replace />
    } else return <Navigate to="/login" />
  }

  return children
}

export default App
