import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/user';
import toast from 'react-hot-toast';

const LogIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const { message, error, loading } = useSelector(state => state.user);

    const handleLogin = async (e) => {
        e.preventDefault();
        await dispatch(login(username, password));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleLogin(e);
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: 'clearError' });
        }
        if (message) {
            toast.success(message);
            dispatch({ type: 'clearMessage' });
        }
    }, [dispatch, error, message]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 px-4">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Login </h2>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-white mb-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                            required
                            className="w-full px-4 py-2 rounded-xl bg-white/80 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="••••••••"
                            required
                            className="w-full px-4 py-2 rounded-xl bg-white/80 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 text-white font-semibold rounded-xl bg-purple-600 hover:bg-purple-700 transition-transform transform hover:scale-105 active:scale-95 disabled:opacity-50"
                    >
                        {loading ? 'Logging in...' : 'Log In'}
                    </button>
                </form>
                {/* <Link to="/register">
                    <p className="text-sm text-white/80 text-center mt-6">
                        Don't have an account? <span className="underline cursor-pointer hover:text-white">Register here</span>
                    </p>
                </Link> */}

            </div>
        </div>
    );
};

export default LogIn;
