import React, { useEffect, useState } from 'react';
import { login } from '../../api/user';
import { getUserInfo } from '../../utils/user.utils';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('admin1');
    const [password, setPassword] = useState('admin123');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigateTo = useNavigate();

    const submit = async () => {
        if (!username) {
            setError('username is required.');
            return;
        }
        if (!password) {
            setError('password is required.');
            return;
        }
        setLoading(true);
        const result = await login(username, password);
        if (result) {
            const userInfo = await getUserInfo();
            console.log('login successfully', userInfo);
            return navigateTo('/');
        } else {
            setError('username or password is invalid.');
        }
        setLoading(false);
    };

    return (
        <div className="h-screen w-screen bg-primary flex justify-center items-center">
            <div className="bg-secondary w-1/2 h-96 flex items-center justify-around rounded">
                <div className="flex flex-col justify-between items-center">
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="username"
                        >
                            Username
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            placeholder="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="mypassword"
                        >
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="mypassword"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="********"
                        />
                        {error && (
                            <p className="text-red-500 text-xs italic">
                                {error}
                            </p>
                        )}
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={() => {
                                if (!loading) submit();
                            }}
                        >
                            Sign In
                        </button>
                    </div>
                </div>
                {/*  */}
            </div>
        </div>
    );
}

export default Login;
