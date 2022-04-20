import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import NoPage from './pages/NotFound';
import Layout from './pages/Layout';
import Logout from './pages/Logout';
import { UserView, UserEditor } from './pages/Users';
import { View } from './pages/Blogs';
import { Announcement } from './pages/Announcements';
import { getUserInfo } from './utils/user.utils';

function App() {
    const isDev = import.meta.env.DEV;
    console.log(`is dev ${isDev} || is prod ${import.meta.env.PROD} `);
    console.log(import.meta.env.BASE_URL);
    return (
        <div className="animate-fade-in-down">
            <BrowserRouter basename={isDev ? '' : 'backoffice'}>
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
                        <Route
                            path="announcements"
                            element={<Announcement />}
                        />
                    </Route>
                    <Route path="login" element={<Login />} />
                    <Route path="logout" element={<Logout />} />
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

const ProtectedRoute = ({ children }) => {
    const user = getUserInfo();
    if (!user || user.role !== 'admin') {
        return <Navigate to="login" replace />;
    }

    return children;
};

export default App;
