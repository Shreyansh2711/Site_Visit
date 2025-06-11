import { server } from "../store";
import axios from "axios";

export const createSupplier = (formData) => async (dispatch) => {
    try {
        dispatch({ type: "createSupplierRequest" });

        const { data } = await axios.post(`${server}/supplier/create`, formData, {
            withCredentials: true,
        });

        dispatch({
            type: "createSupplierSuccess",
            payload: data
        });
    } catch (error) {
        dispatch({
            type: "createSupplierFail",
            payload: error.response.data.message,
        });
    }
}

export const getAllSuppliers = () => async (dispatch) => {
    try {
        dispatch({ type: "getAllSuppliersRequest" });

        const { data } = await axios.get(`${server}/supplier/all`, {
            withCredentials: true,
        });

        dispatch({
            type: "getAllSuppliersSuccess",
            payload: data
        });
    } catch (error) {
        dispatch({
            type: "getAllSuppliersFail",
            payload: error.response.data.message,
        });
    }
}

export const getSupplierById = (supplierId) => async (dispatch) => {
    try {
        dispatch({ type: "getSupplierByIdRequest" });

        const { data } = await axios.get(`${server}/getsupplier/${supplierId}`, {
            withCredentials: true,
        });

        dispatch({
            type: "getSupplierByIdSuccess",
            payload: data
        });
    } catch (error) {
        dispatch({
            type: "getSupplierByIdFail",
            payload: error.response.data.message,
        });
    }
}