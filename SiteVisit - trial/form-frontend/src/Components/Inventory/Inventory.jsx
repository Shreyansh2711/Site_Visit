import React from 'react';
import { Link } from 'react-router-dom';

const Inventory = () => {
    const links = [
        { to: '/admin/inventory/items', label: 'Items' },
        { to: '/admin/inventory/suppliers', label: 'Suppliers' },
        { to: '/admin/inventory/inwards', label: 'Inventory Inwards' },
        { to: '/admin/inventory/outwards', label: 'Inventory Outwards' },
    ];



    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 flex flex-col items-center px-6 py-12 space-y-6">
            {/* Back Button */}
            <div className="w-full max-w-lg">
                <Link to="/admin">
                    <button className="bg-white text-purple-600 border border-purple-600 py-2 px-5 rounded-lg text-sm font-medium hover:bg-purple-50 transition duration-300 shadow-md">
                        ← Back to Admin Dashboard
                    </button>
                </Link>
            </div>

            {/* Card */}
            <div className="bg-white p-10 md:p-12 rounded-3xl shadow-2xl w-full max-w-lg text-center">
                <h1 className="text-4xl font-bold mb-10 text-gray-800">Inventory Dashboard</h1>
                <div className="space-y-5">
                    {links.map((link) => (
                        <Link key={link.to} to={link.to} className="block">
                            <button className="w-full bg-purple-600 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:bg-purple-700 transition-all duration-300 shadow-md">
                                {link.label}
                            </button>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Inventory;
