import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { createInventoryOutward } from '../../../redux/actions/item';

const CreateInventoryOutward = () => {
    const dispatch = useDispatch();

    const { error, message } = useSelector(state => state.item);

    const [formData, setFormData] = useState({
        item_id: '',
        quantity_displacement: '',
        purpose: '',
        date: '',
        destination: '',
        dispatched_by: '',
        remark: '',
        site_name: '',
        scope: ''
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
        dispatch(createInventoryOutward(formData));

        setFormData({
            item_id: '',
            quantity_displacement: '',
            purpose: '',
            date: '',
            destination: '',
            dispatched_by: '',
            remark: '',
            site_name: '',
            scope: ''
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
            <div className="w-full max-w-2xl mb-4">
                <Link to="/admin/inventory/outwards">
                    <button className="bg-white text-purple-600 border border-purple-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-purple-50 transition duration-300 shadow-sm">
                        ← Back to Inventory Outward
                    </button>
                </Link>
            </div>

            <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">Create Inventory Outward</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                        { label: "Item ID", name: "item_id" },
                        { label: "Quantity Displacement", name: "quantity_displacement" },
                        { label: "Purpose", name: "purpose" },
                        { label: "Date", name: "date", type: "date" },
                        { label: "Destination", name: "destination" },
                        { label: "Dispatched By", name: "dispatched_by" },
                        { label: "Remark", name: "remark" },
                        { label: "Site Name", name: "site_name" },
                        { label: "Scope", name: "scope" }
                    ].map(({ label, name, type = "text" }) => (
                        <div key={name}>
                            <label className="block text-gray-700 font-semibold mb-1">{label}</label>
                            <input
                                type={type}
                                name={name}
                                value={formData[name]}
                                onChange={handleChange}
                                required
                                className="w-full border border-purple-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                    <Link to="/admin/inventory/outward/all">
                        <span className="text-purple-600 hover:underline font-medium">
                            View All Outward Entries
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CreateInventoryOutward;
