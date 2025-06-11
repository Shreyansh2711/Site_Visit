import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Building2, Boxes } from 'lucide-react';
import { logout } from '../../redux/actions/user';

const AdminPage = () => {
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-tr from-gray-100 to-purple-100 p-6">
            {/* Logout Button */}
            <div className="absolute top-6 right-6">
                <button
                    onClick={handleLogout}
                    className="bg-purple-600 text-white px-5 py-2 rounded-lg shadow hover:bg-purple-700 transition"
                >
                    Logout
                </button>
            </div>

            <div className="flex flex-col items-center justify-center h-full">
                <div className="mb-6 animate-fade-in-down text-center">
                    <h2 className="text-xl text-gray-600">Welcome,</h2>
                    <h1 className="text-3xl font-extrabold text-purple-800">{user?.login_id}</h1>
                </div>

                <h1 className="text-2xl font-bold text-gray-700 mb-8">Admin Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Link
                        to="/admin/site-visit"
                        className="group w-64 p-6 bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 transform hover:scale-105 border border-purple-200"
                    >
                        <div className="flex items-center gap-4">
                            <Building2 className="w-8 h-8 text-purple-600 group-hover:text-purple-800 transition" />
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800">Site Visit</h2>
                                <p className="text-gray-500 text-sm">Manage and track site visits</p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        to="/admin/inventory"
                        className="group w-64 p-6 bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 transform hover:scale-105 border border-purple-200"
                    >
                        <div className="flex items-center gap-4">
                            <Boxes className="w-8 h-8 text-purple-600 group-hover:text-purple-800 transition" />
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800">Inventory</h2>
                                <p className="text-gray-500 text-sm">Control and view inventory</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
