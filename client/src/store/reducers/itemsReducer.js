import { GET_QUERY_RESULTS, SET_LOADING_TRUE, SET_LOADING_FALSE, GET_QUERIES } from "../action-types/index";

const initialState = {
    items: [],
    queries: [],
    loading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_QUERY_RESULTS:
            return {
                ...state,
                items: action.payload.data,
                queries: action.payload.query !== undefined
                    ? [...state.queries, action.payload.query]
                    : [...state.queries]
            };
        case GET_QUERIES:
            return {
                ...state,
                queries: action.payload
            }
        case SET_LOADING_TRUE:
            return { ...state, loading: true };
        case SET_LOADING_FALSE:
            return { ...state, loading: false };
        default:
            return state;
    }
};

export default reducer;