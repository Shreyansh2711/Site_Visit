import { server } from "../store";
import axios from "axios";

export const createItem = (formData) => async (dispatch) => {
    try {
        dispatch({ type: "createItemRequest" });

        const { data } = await axios.post(`${server}/item/create`, formData, {
            withCredentials: true,
        });

        dispatch({
            type: "createItemSuccess",
            payload: data
        });
    } catch (error) {
        dispatch({
            type: "createItemFail",
            payload: error.response.data.message,
        });
    }
}


export const getAllItems = () => async (dispatch) => {
    try {
        dispatch({ type: "getAllItemsRequest" });

        const { data } = await axios.get(`${server}/item/items`, {
            withCredentials: true,
        });

        console.log({ data });

        dispatch({
            type: "getAllItemsSuccess",
            payload: data
        });
    } catch (error) {
        dispatch({
            type: "getAllItemsFail",
            payload: error.response.data.message,
        });
    }
}

export const getItemById = (itemId) => async (dispatch) => {
    try {
        dispatch({ type: "getItemByIdRequest" });

        const { data } = await axios.get(`${server}/getitem/${itemId}`, {
            withCredentials: true,
        });

        dispatch({
            type: "getItemByIdSuccess",
            payload: data
        });
    } catch (error) {
        dispatch({
            type: "getItemByIdFail",
            payload: error.response.data.message,
        });
    }
}

export const createInventoryInward = (formData) => async (dispatch) => {
    try {
        dispatch({ type: "createInventoryInwardRequest" });

        const { data } = await axios.post(`${server}/item/createinward`, formData, {
            withCredentials: true,
        });

        dispatch({
            type: "createInventoryInwardSuccess",
            payload: data
        });
    } catch (error) {
        dispatch({
            type: "createInventoryInwardFail",
            payload: error.response.data.message,
        });
    }
}

export const createInventoryOutward = (formData) => async (dispatch) => {
    try {
        dispatch({ type: "createInventoryOutwardRequest" });

        const { data } = await axios.post(`${server}/item/createoutward`, formData, {
            withCredentials: true,
        });

        dispatch({
            type: "createInventoryOutwardSuccess",
            payload: data
        });
    } catch (error) {
        dispatch({
            type: "createInventoryOutwardFail",
            payload: error.response.data.message,
        });
    }
}

export const getAllInventoryInward = () => async (dispatch) => {
    try {
        dispatch({ type: "getAllInventoryInwardRequest" });

        const { data } = await axios.get(`${server}/item/inwards`, {
            withCredentials: true,
        });

        console.log({ data });

        dispatch({
            type: "getAllInventoryInwardSuccess",
            payload: data
        });
    } catch (error) {
        dispatch({
            type: "getAllInventoryInwardFail",
            payload: error.response.data.message,
        });
    }
}

export const getAllInventoryOutward = () => async (dispatch) => {
    try {
        dispatch({ type: "getAllInventoryOutwardRequest" });

        const { data } = await axios.get(`${server}/item/outwards`, {
            withCredentials: true,
        });

        console.log({ data });

        dispatch({
            type: "getAllInventoryOutwardSuccess",
            payload: data
        });

    } catch (error) {
        dispatch({
            type: "getAllInventoryOutwardFail",
            payload: error.response.data.message,
        });
    }
}

