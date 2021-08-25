import { GET_QUERIES, GET_QUERY_RESULTS, SET_LOADING_FALSE, SET_LOADING_TRUE } from "../action-types/index";
import axios from "../../api/axios";

export const getQueryResults = (query, firstSearch = true) => async (dispatch) => {
    dispatch({ type: SET_LOADING_TRUE });
    const { data } = await axios.get(`item?q=${query}`);
    dispatch({ type: GET_QUERY_RESULTS, payload: firstSearch ? { data, query } : { data } });
    dispatch({ type: SET_LOADING_FALSE });
};

export const postQueries = (query) => async (dispatch) => {
    dispatch({ type: SET_LOADING_TRUE });
    await axios.post("item", { query });
    dispatch({ type: SET_LOADING_FALSE });
};

export const getQueries = () => async (dispatch) => {
    dispatch({ type: SET_LOADING_TRUE });
    const { data } = await axios.get("items");
    if (data !== null) {
        dispatch({ type: GET_QUERIES, payload: data });
    }
    dispatch({ type: SET_LOADING_FALSE });
};