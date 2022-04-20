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
    return (
        <div className="animate-fade-in-down">
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route
                            path="backoffice/"
                            element={
                                <ProtectedRoute>
                                    <Home />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="backoffice/users"
                            element={
                                <ProtectedRoute>
                                    <UserView />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="backoffice/users/:id"
                            element={
                                <ProtectedRoute>
                                    <UserEditor />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="backoffice/blogs"
                            element={
                                <ProtectedRoute>
                                    <View />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="backoffice/announcements"
                            element={<Announcement />}
                        />
                    </Route>
                    <Route path="backoffice/login" element={<Login />} />
                    <Route path="backoffice/logout" element={<Logout />} />
                    <Route path="backoffice/*" element={<NoPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

const ProtectedRoute = ({ children }) => {
    const user = getUserInfo();
    if (!user || user.role !== 'admin') {
        return <Navigate to="backoffice/login" replace />;
    }

    return children;
};

export default App;
