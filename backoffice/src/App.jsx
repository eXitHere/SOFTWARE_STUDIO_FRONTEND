import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import NoPage from './pages/NotFound';
import Layout from './pages/Layout';
import Users from './pages/Users';

function App() {
    const user = null;
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute user={user}>
                                <Home />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="users" element={<Users />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
                <Route path="login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

const ProtectedRoute = ({ user, children }) => {
    if (user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default App;
