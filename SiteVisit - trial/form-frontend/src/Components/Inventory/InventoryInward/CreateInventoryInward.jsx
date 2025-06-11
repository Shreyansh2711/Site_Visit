import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { createInventoryInward } from '../../../redux/actions/item';

const CreateInventoryInward = () => {
    const dispatch = useDispatch();


    const { error, message } = useSelector(state => state.item);

    const [formData, setFormData] = useState({
        item_id: '',
        supplier_id: '',
        quantity_received: '',
        purchased_price: '',
        total_cost: '',
        date_received: '',
        received_by: '',
        remark: ''
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
        dispatch(createInventoryInward(formData));

        setFormData({
            item_id: '',
            supplier_id: '',
            quantity_received: '',
            purchased_price: '',
            total_cost: '',
            date_received: '',
            received_by: '',
            remark: ''
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
            {/* Back Button */}
            <div className="w-full max-w-2xl mb-4">
                <Link to="/admin/inventory/inwards">
                    <button className="bg-white text-purple-600 border border-purple-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-purple-50 transition duration-300 shadow-sm">
                        ← Back to Inventory Inward
                    </button>
                </Link>
            </div>

            <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">Create Inventory Inward</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {[
                        { name: 'item_id', label: 'Item ID', type: 'number' },
                        { name: 'supplier_id', label: 'Supplier ID', type: 'number' },
                        { name: 'quantity_received', label: 'Quantity Received', type: 'number' },
                        { name: 'purchased_price', label: 'Purchased Price', type: 'number', step: '0.01' },
                        { name: 'total_cost', label: 'Total Cost', type: 'number', step: '0.01' },
                        { name: 'date_received', label: 'Date Received', type: 'date' },
                        { name: 'received_by', label: 'Received By (User ID)', type: 'number' },
                        { name: 'remark', label: 'Remark', type: 'text' },
                    ].map(field => (
                        <div key={field.name}>
                            <label className="block text-gray-700 font-semibold mb-2">{field.label}</label>
                            <input
                                type={field.type}
                                name={field.name}
                                step={field.step}
                                value={formData[field.name]}
                                onChange={handleChange}
                                className="w-full border border-purple-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder={`Enter ${field.label.toLowerCase()}`}
                                required
                            />
                        </div>
                    ))}
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
                    <Link to="/admin/inventory/inward/all">
                        <span className="text-purple-600 hover:underline font-medium">
                            View All Inward Entries
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CreateInventoryInward;
