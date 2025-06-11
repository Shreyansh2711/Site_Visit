import { server } from "../store";
import axios from "axios";

export const getAllSiteVisitsByUserId = (userId) => async (dispatch) => {
    try {
        dispatch({ type: "getSiteVisitByUserIdRequest" });

        const { data } = await axios.get(`${server}/getsitesbyuser/${userId}`, {
            withCredentials: true,
        });

        console.log({ data });
        dispatch({
            type: "getSiteVisitByUserIdSuccess",
            payload: data
        });
    }
    catch (error) {
        dispatch({
            type: "getSiteVisitByUserIdFail",
            payload: error.response.data.message,
        });
    }
}

export const createSiteVisit = (formData) => async (dispatch) => {
    try {
        dispatch({ type: "createSiteVisitRequest" });
        console.log({ formData });
        const { data } = await axios.post(`${server}/createsite`, formData, {
            withCredentials: true,
        });

        console.log({ data });
        dispatch({
            type: "createSiteVisitSuccess",
            payload: data
        });
    }
    catch (error) {
        dispatch({
            type: "createSiteVisitFail",
            payload: error.response.data.message,
        });
    }
}