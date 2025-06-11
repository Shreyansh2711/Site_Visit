import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser, logout } from '../redux/actions/user';
import { createSiteVisit, getAllSiteVisitsByUserId } from '../redux/actions/stateVisit';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FrontPage = () => {
    const { siteVisits, loading } = useSelector(state => state.siteVisit);
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const initialFormData = {
        site_name: '',
        site_type: '',
        location_address: '',
        date_of_visit: '',
        description: '',
        client_name: '',
        client_designation: '',
        client_mail: '',
        contact_number: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        if (user?.id) {
            dispatch(getAllSiteVisitsByUserId(user.id));
        }
    }, [dispatch, user]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, filterType]);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await dispatch(createSiteVisit(formData));
            await dispatch(getAllSiteVisitsByUserId(user.id));
            await dispatch(loadUser());
            setFormData(initialFormData);
            toast.success('Site visit submitted successfully!');
        } catch (error) {
            toast.error('Failed to submit site visit. Please try again.');
        }
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    const filteredVisits = siteVisits?.filter(visit => {
        const matchesSearch =
            visit.site_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            visit.client_name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType ? visit.site_type === filterType : true;
        return matchesSearch && matchesType;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentVisits = filteredVisits?.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil((filteredVisits?.length || 0) / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (loading) return <div className="text-white text-center py-10">Loading...</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 p-6 text-white">

            {/* Logout Button */}
            <div className="flex justify-between mb-6">
                <h1 className="text-3xl font-extrabold text-white text-centre">
                    Welcome, <span className='text-red-200'>{user?.login_id}</span>
                </h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg"
                >
                    Logout
                </button>
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-extrabold text-center mb-8">Site Visit Form</h1>

            {/* Form Card */}
            <div className="bg-white text-black p-6 rounded-2xl shadow-lg max-w-5xl mx-auto mb-8">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { label: 'Site Name', name: 'site_name' },
                        { label: 'Client Name', name: 'client_name' },
                        { label: 'Site Type', name: 'site_type' },
                        { label: 'Client Designation', name: 'client_designation' },
                        { label: 'Site Address', name: 'location_address' },
                        { label: 'Client Contact Number', name: 'contact_number' },
                        { label: 'Date of Visit', name: 'date_of_visit', type: 'date' },
                        { label: 'Client Email', name: 'client_mail', type: 'email' },
                        { label: 'Description', name: 'description' },
                    ].map(({ label, name, type = 'text' }) => (
                        <div key={name}>
                            <label className="block font-semibold mb-1">{label}</label>
                            {name === 'site_type' ? (
                                <select
                                    name={name}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                >
                                    <option value="">Select Site Type</option>
                                    <option value="Society">Society</option>
                                    <option value="Cooperate">Cooperate</option>
                                    <option value="Public Parking">Public Parking</option>
                                </select>
                            ) : name === 'date_of_visit' ? (
                                <DatePicker
                                    selected={formData.date_of_visit ? new Date(formData.date_of_visit) : null}
                                    onChange={(date) =>
                                        setFormData({
                                            ...formData,
                                            date_of_visit: date.toISOString().split('T')[0]
                                        })
                                    }
                                    dateFormat="yyyy-MM-dd"
                                    placeholderText="yyyy-mm-dd"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                />
                            ) : (
                                <input
                                    type={type}
                                    name={name}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                />
                            )}
                        </div>
                    ))}
                    <div className="col-span-full text-right mt-4">
                        <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg">
                            Submit
                        </button>
                    </div>
                </form>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-5xl mx-auto mb-4">
                <input
                    type="text"
                    placeholder="Search by Site or Client Name"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full md:w-1/2 text-black"
                />
                <select
                    value={filterType}
                    onChange={e => setFilterType(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full md:w-1/4 text-black"
                >
                    <option value="">All Site Types</option>
                    <option value="Society">Society</option>
                    <option value="Cooperate">Cooperate</option>
                    <option value="Public Parking">Public Parking</option>
                </select>
            </div>

            {/* Table Card */}
            <div className="bg-white text-black p-6 rounded-2xl shadow-xl max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold mb-4 text-purple-700">Site Visit Records</h2>

                {filteredVisits && filteredVisits.length > 0 ? (
                    <>
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto border border-gray-200 text-sm">
                                <thead className="bg-gray-100">
                                    <tr>
                                        {['Site Name', 'Site Type', 'Address', 'Date of Visit', 'Description', 'Client Name', 'Designation', 'Email', 'Contact'].map((head, i) => (
                                            <th key={i} className="border px-4 py-2 text-left">{head}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentVisits.map((visit, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="border px-4 py-2">{visit.site_name}</td>
                                            <td className="border px-4 py-2">{visit.site_type}</td>
                                            <td className="border px-4 py-2">{visit.location_address}</td>
                                            <td className="border px-4 py-2">{new Date(visit.date_of_visit).toLocaleDateString('en-GB')}</td>
                                            <td className="border px-4 py-2">{visit.description}</td>
                                            <td className="border px-4 py-2">{visit.client_name}</td>
                                            <td className="border px-4 py-2">{visit.client_designation}</td>
                                            <td className="border px-4 py-2">{visit.client_mail}</td>
                                            <td className="border px-4 py-2">{visit.contact_number}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center mt-6 space-x-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-3 py-1 border rounded-lg disabled:opacity-50"
                            >
                                Prev
                            </button>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`px-3 py-1 border rounded-lg ${currentPage === index + 1 ? 'bg-purple-600 text-white' : ''}`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 border rounded-lg disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="text-gray-700">No matching site visits found.</div>
                )}
            </div>

            {/* Toast Notifications */}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        </div>
    );
};

export default FrontPage;
