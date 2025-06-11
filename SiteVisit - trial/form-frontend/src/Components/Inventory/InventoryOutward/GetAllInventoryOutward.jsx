import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllInventoryOutward } from '../../../redux/actions/item';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const GetAllInventoryOutward = () => {
    const dispatch = useDispatch();
    const [searchItemId, setSearchItemId] = useState('');

    const { inventoryOutwards, error, message } = useSelector(state => state.item);

    useEffect(() => {
        dispatch(getAllInventoryOutward());
    }, [dispatch]);

    useEffect(() => {
        console.log({ inventoryOutwards });
    }, [inventoryOutwards]);

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

    const filteredOutwards = inventoryOutwards?.filter(entry =>
        entry.item_id.toString().includes(searchItemId)
    );

    return (
        <div className="p-6 bg-gradient-to-br from-purple-200 via-purple-100 to-white min-h-screen">
            {/* Back Button */}
            <div className="w-full max-w-lg mb-6">
                <Link to="/admin/inventory/outwards">
                    <button className="bg-white text-purple-600 border border-purple-600 py-2 px-5 rounded-lg text-sm font-medium hover:bg-purple-50 transition duration-300 shadow-md">
                        ← Back to Inventory Outward
                    </button>
                </Link>
            </div>

            <h1 className="text-3xl font-bold text-purple-700 mb-6">All Inventory Outward Entries</h1>

            {/* Search */}
            <input
                type="text"
                placeholder="Search by Item ID"
                className="mb-6 px-4 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-full md:w-1/2"
                value={searchItemId}
                onChange={(e) => setSearchItemId(e.target.value)}
            />

            {inventoryOutwards ? (
                <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredOutwards?.map(entry => (
                        <li
                            key={entry._id}
                            className="p-5 bg-white rounded-xl shadow-md border border-purple-100 transition-transform hover:scale-105 hover:shadow-xl duration-300"
                        >
                            <h2 className="text-xl font-bold text-purple-800">Item ID: {entry.item_id}</h2>
                            <p className="text-gray-600 mt-1">Quantity Displaced: {entry.quantity_displacement}</p>
                            <p className="text-gray-600 mt-1">Purpose: {entry.purpose}</p>
                            <p className="text-gray-600 mt-1">Date: {entry.date}</p>
                            <p className="text-gray-600 mt-1">Destination: {entry.destination}</p>
                            <p className="text-gray-600 mt-1">Dispatched By: {entry.dispatched_by}</p>
                            <p className="text-gray-600 mt-1">Site Name: {entry.site_name}</p>
                            <p className="text-gray-600 mt-1">Scope: {entry.scope}</p>
                            <p className="text-gray-600 mt-1">Remark: {entry.remark}</p>
                        </li>
                    ))}
                    {filteredOutwards?.length === 0 && (
                        <p className="text-purple-600 col-span-full text-center">No matching entries found.</p>
                    )}
                </ul>
            ) : (
                <div className="flex justify-center items-center mt-12">
                    <Loader2 className="animate-spin text-purple-600" size={40} />
                    <span className="ml-2 text-purple-600 text-lg font-medium">Loading...</span>
                </div>
            )}
        </div>
    );
};

export default GetAllInventoryOutward;
