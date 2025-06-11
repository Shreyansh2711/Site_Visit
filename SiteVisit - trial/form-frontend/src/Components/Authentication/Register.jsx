import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/actions/user';
import toast from 'react-hot-toast';

const Register = () => {
    const [login_id, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('User');

    const dispatch = useDispatch();
    const { message, error, loading } = useSelector(state => state.user);

    const handleRegister = async (e) => {
        e.preventDefault();
        await dispatch(register({ login_id, password, role }));
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
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-700 to-purple-600 px-4">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Create an Account</h2>
                <form onSubmit={handleRegister} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-white mb-1">Login ID</label>
                        <input
                            type="text"
                            value={login_id}
                            onChange={(e) => setLoginId(e.target.value)}
                            placeholder="Enter login ID"
                            required
                            className="w-full px-4 py-2 rounded-xl bg-white/80 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="w-full px-4 py-2 rounded-xl bg-white/80 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white mb-2">Role</label>
                        <div className="flex items-center gap-6">
                            <label className="inline-flex items-center text-white">
                                <input
                                    type="radio"
                                    value="User"
                                    checked={role === 'User'}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="form-radio h-4 w-4 text-indigo-600"
                                />
                                <span className="ml-2">User</span>
                            </label>
                            <label className="inline-flex items-center text-white">
                                <input
                                    type="radio"
                                    value="Admin"
                                    checked={role === 'Admin'}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="form-radio h-4 w-4 text-indigo-600"
                                />
                                <span className="ml-2">Admin</span>
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 text-white font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 transition-transform transform hover:scale-105 active:scale-95 disabled:opacity-50"
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
                <p className="text-sm text-white/80 text-center mt-6">
                    Already have an account? <span className="underline cursor-pointer hover:text-white">Log in here</span>
                </p>
            </div>
        </div>
    );
};

export default Register;
