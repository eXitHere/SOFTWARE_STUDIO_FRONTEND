import React, { useState } from 'react';

function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const submit = () => {
        setLoading(true);
        console.log(`submit ${username}, ${password}`);
    };

    return (
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
                        placeholder="Username"
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
                        placeholder="******************"
                    />
                    {error && (
                        <p className="text-red-500 text-xs italic">
                            Please choose a password.
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
    );
}

export default Login;
