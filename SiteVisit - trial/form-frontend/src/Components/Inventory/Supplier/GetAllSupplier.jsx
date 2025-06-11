import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSuppliers } from '../../../redux/actions/supplier';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const GetAllSupplier = () => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");

    const { suppliers, error, message } = useSelector(state => state.supplier);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getAllSuppliers());
        };
        fetchData();
    }, [dispatch]);

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

    const filteredSuppliers = suppliers?.filter(supplier =>
        supplier.supplier_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 bg-gradient-to-br from-purple-200 via-purple-100 to-white min-h-screen">
            {/* Back Button */}
            <div className="w-full max-w-lg mb-6">
                <Link to="/admin/inventory/suppliers">
                    <button className="bg-white text-purple-600 border border-purple-600 py-2 px-5 rounded-lg text-sm font-medium hover:bg-purple-50 transition duration-300 shadow-md">
                        ← Back to Suppliers
                    </button>
                </Link>
            </div>
            <h1 className="text-3xl font-bold text-purple-700 mb-6">All Suppliers</h1>

            <input
                type="text"
                placeholder="Search suppliers..."
                className="mb-6 px-4 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-full md:w-1/2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {suppliers ? (
                <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredSuppliers?.map(supplier => (
                        <li
                            key={supplier._id}
                            className="p-5 bg-white rounded-xl shadow-md border border-purple-100 transition-transform hover:scale-105 hover:shadow-xl duration-300"
                        >
                            <h2 className="text-xl font-bold text-purple-800">{supplier.supplier_name}</h2>
                            <p className="text-gray-600 mt-1">📞 {supplier.contact_number}</p>
                            <p className="text-gray-600">✉️ {supplier.email_id}</p>
                            <p className="text-sm text-purple-700 mt-2">{supplier.address}</p>
                        </li>
                    ))}
                    {filteredSuppliers.length === 0 && (
                        <p className="text-purple-600 col-span-full text-center">No matching suppliers found.</p>
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

export default GetAllSupplier;
