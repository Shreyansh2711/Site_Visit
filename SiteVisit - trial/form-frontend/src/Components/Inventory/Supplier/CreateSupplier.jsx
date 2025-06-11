import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSupplier } from '../../../redux/actions/supplier';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const CreateSupplier = () => {
    const dispatch = useDispatch();

    const { error, message } = useSelector(state => state.supplier);

    const [formData, setFormData] = useState({
        supplier_name: '',
        contact_number: '',
        email_id: '',
        address: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createSupplier(formData));

        setFormData({
            supplier_name: '',
            contact_number: '',
            email_id: '',
            address: ''
        });
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
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-8">
            <div className="w-full max-w-lg mb-4">
                <Link to="/admin/inventory/suppliers">
                    <button className="flex items-center gap-2 bg-white text-purple-600 border border-purple-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-purple-50 transition duration-300 shadow-sm">
                        ← Back to Suppliers
                    </button>
                </Link>
            </div>

            <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">Create New Supplier</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Supplier Name</label>
                        <input
                            type="text"
                            name="supplier_name"
                            value={formData.supplier_name}
                            onChange={handleChange}
                            className="w-full border border-purple-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter supplier name"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Contact Number</label>
                        <input
                            type="text"
                            name="contact_number"
                            value={formData.contact_number}
                            onChange={handleChange}
                            className="w-full border border-purple-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter contact number"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Email ID</label>
                        <input
                            type="email"
                            name="email_id"
                            value={formData.email_id}
                            onChange={handleChange}
                            className="w-full border border-purple-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter email address"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Address</label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full border border-purple-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter address"
                            required
                        ></textarea>
                    </div>
                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full bg-purple-600 text-white py-3 rounded-md font-semibold hover:bg-purple-700 transition duration-300"
                        >
                            Submit
                        </button>
                    </div>
                </form>

                <div className="text-center mt-6">
                    <Link to="/admin/inventory/suppliers/all">
                        <span className="text-purple-600 hover:underline font-medium">
                            View All Suppliers
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CreateSupplier;
