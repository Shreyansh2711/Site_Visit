import { server } from "../store";
import axios from "axios";

export const register = (formData) => async (dispatch) => {
    try {
        dispatch({ type: "registerRequest" });
        console.log({ formData });

        const { data } = await axios.post(`${server}/create`, formData, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });

        console.log({ data });
        dispatch({
            type: "registerSuccess",
            payload: data
        });
    }
    catch (error) {
        dispatch({
            type: "registerFail",
            payload: error.response.data.message,
        });
    }
}

export const login = (userName, password) => async (dispatch) => {
    try {
        dispatch({ type: "loginRequest" });
        console.log({ userName, password });
        const { data } = await axios.post(`${server}/login`, { login_id: userName, password }, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });

        console.log({ data });
        dispatch({
            type: "loginSuccess",
            payload: data
        });
    }
    catch (error) {
        dispatch({
            type: "loginFail",
            payload: error.response.data.message,
        });
    }
}

export const logout = () => async (dispatch) => {
    try {
        dispatch({ type: "logoutRequest" });

        const { data } = await axios.get(`${server}/logout`, {
            withCredentials: true,
        });

        console.log({ data });
        dispatch({
            type: "logoutSuccess",
            payload: data
        });
    }
    catch (error) {
        dispatch({
            type: "logoutFail",
            payload: error.response.data.message,
        });
    }
}

export const isUserLoggedIn = () => async (dispatch) => {
    try {
        dispatch({ type: "isLoggedInRequest" });

        const { data } = await axios.get(`${server}/isLoggedIn`, {
            withCredentials: true,
        });

        console.log({ data });
        dispatch({
            type: "isLoggedInSuccess",
            payload: data
        });
    }
    catch (error) {
        dispatch({
            type: "isLoggedInFail",
            payload: error.response.data.message,
        });
    }
}

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: "loadUserRequest" });

        const { data } = await axios.get(`${server}/me`, {
            withCredentials: true,
        });

        console.log({ data });
        dispatch({
            type: "loadUserSuccess",
            payload: data
        });
    }
    catch (error) {
        dispatch({
            type: "loadUserFail",
            payload: error.response.data.message,
        });
    }
}

export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: "getAllUsersRequest" });

        const { data } = await axios.get(`${server}/all`, {
            withCredentials: true,
        });

        console.log({ data });
        dispatch({
            type: "getAllUsersSuccess",
            payload: data
        });
    }
    catch (error) {
        dispatch({
            type: "getAllUsersFail",
            payload: error.response.data.message,
        });
    }
}