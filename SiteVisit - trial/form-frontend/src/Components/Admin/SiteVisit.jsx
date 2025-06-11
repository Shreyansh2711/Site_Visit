import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/user';
import { getAllSiteVisitsByUserId } from '../../redux/actions/stateVisit';
import { Link } from 'react-router-dom';

const SiteVisit = () => {
    const dispatch = useDispatch();
    const { allUsers } = useSelector((state) => state.user);
    const { siteVisits } = useSelector((state) => state.siteVisit);
    const [selectedUser, setSelectedUser] = useState(null);

    const [userSearch, setUserSearch] = useState('');
    const [visitSearch, setVisitSearch] = useState('');
    const [siteTypeFilter, setSiteTypeFilter] = useState('');

    const handleLogout = () => {
        dispatch(logout());
    };

    const handleViewUser = async (user) => {
        await dispatch(getAllSiteVisitsByUserId(user.id));
        setSelectedUser(user);
        setVisitSearch('');
        setSiteTypeFilter('');
    };

    const filteredUsers = allUsers?.filter((user) =>
        `${user.login_id} ${user.role}`.toLowerCase().includes(userSearch.toLowerCase())
    );

    const filteredVisits = siteVisits?.filter((visit) => {
        const searchString = `${visit.client_name} ${visit.site_name} ${visit.client_mail} ${visit.location_address}`;
        const matchesSearch = searchString.toLowerCase().includes(visitSearch.toLowerCase());
        const matchesType = siteTypeFilter
            ? visit.site_type.toLowerCase() === siteTypeFilter.toLowerCase()
            : true;
        return matchesSearch && matchesType;
    });

    return (
        <div className="bg-purple-100 min-h-screen p-6">
            <div className="flex justify-between items-center mb-6">
                <Link to="/admin">
                    <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
                        Back
                    </button>
                </Link>
                <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
                >
                    Logout
                </button>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
                <p className="text-gray-700 mb-6">Manage users, settings, and more.</p>

                {/* User Search */}
                <h2 className="text-2xl font-semibold mb-2">All Users</h2>
                <input
                    type="text"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    placeholder="Search by Login ID or Role"
                    className="mb-4 p-3 border rounded-lg w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />

                {/* Users Table - only "user" roles shown */}
                {filteredUsers && filteredUsers.filter(u => u.role?.toLowerCase() === 'user').length > 0 ? (
                    <table className="min-w-full border border-gray-300 mb-8 rounded-lg overflow-hidden shadow-md">
                        <thead className="bg-purple-200">
                            <tr>
                                <th className="border px-4 py-2">Login ID</th>
                                <th className="border px-4 py-2">Role</th>
                                <th className="border px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers
                                .filter((user) => user.role?.toLowerCase() === 'user')
                                .map((user) => (
                                    <tr key={user.id} className="hover:bg-purple-50 transition">
                                        <td className="border px-4 py-2">{user.login_id}</td>
                                        <td className="border px-4 py-2">{user.role}</td>
                                        <td className="border px-4 py-2">
                                            <button
                                                onClick={() => handleViewUser(user)}
                                                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-600">No users found.</p>
                )}
            </div>

            {/* Selected User and Site Visits */}
            {selectedUser && (
                <div className="bg-white p-6 mt-6 rounded-2xl shadow-lg">
                    <h3 className="text-2xl font-bold mb-4">User Details</h3>
                    <p className="mb-1"><strong>ID:</strong> {selectedUser.id}</p>
                    <p className="mb-1"><strong>Login ID:</strong> {selectedUser.login_id}</p>
                    <p className="mb-4"><strong>Role:</strong> {selectedUser.role}</p>

                    {/* Visit Filters */}
                    <h4 className="text-xl font-semibold mt-6 mb-2">Site Visits</h4>
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                        <input
                            type="text"
                            value={visitSearch}
                            onChange={(e) => setVisitSearch(e.target.value)}
                            placeholder="Search by client, site, email, address"
                            className="p-3 border rounded-lg w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                        <select
                            value={siteTypeFilter}
                            onChange={(e) => setSiteTypeFilter(e.target.value)}
                            className="p-3 border rounded-lg w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        >
                            <option value="">All Site Types</option>
                            <option value="Cooperate">Cooperate</option>
                            <option value="Society">Society</option>
                            <option value="Public Parking">Public Parking</option>
                        </select>
                    </div>

                    {/* Site Visits Table */}
                    {filteredVisits && filteredVisits.length > 0 ? (
                        <div className="overflow-x-auto rounded-lg shadow">
                            <table className="min-w-full border border-gray-300">
                                <thead className="bg-purple-200">
                                    <tr>
                                        <th className="border px-4 py-2">Date of Visit</th>
                                        <th className="border px-4 py-2">Client Name</th>
                                        <th className="border px-4 py-2">Designation</th>
                                        <th className="border px-4 py-2">Contact</th>
                                        <th className="border px-4 py-2">Email</th>
                                        <th className="border px-4 py-2">Site Name</th>
                                        <th className="border px-4 py-2">Type</th>
                                        <th className="border px-4 py-2">Address</th>
                                        <th className="border px-4 py-2">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredVisits.map((visit) => (
                                        <tr key={visit.id} className="hover:bg-purple-50 transition">
                                            <td className="border px-4 py-2">{new Date(visit.date_of_visit).toLocaleDateString()}</td>
                                            <td className="border px-4 py-2">{visit.client_name}</td>
                                            <td className="border px-4 py-2">{visit.client_designation}</td>
                                            <td className="border px-4 py-2">{visit.contact_number}</td>
                                            <td className="border px-4 py-2">{visit.client_mail}</td>
                                            <td className="border px-4 py-2">{visit.site_name}</td>
                                            <td className="border px-4 py-2">{visit.site_type}</td>
                                            <td className="border px-4 py-2">{visit.location_address}</td>
                                            <td className="border px-4 py-2">{visit.description}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-600 mt-4">No site visits match the criteria.</p>
                    )}

                    <button
                        onClick={() => setSelectedUser(null)}
                        className="mt-6 bg-gray-600 text-white px-5 py-2 rounded-lg hover:bg-gray-700 transition"
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
};

export default SiteVisit;
