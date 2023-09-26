import initialState from "../initialState";

const appReducer = (currentState, action) => {

    const state = currentState || initialState.app;

    switch(action.type) {

        case 'REQUEST_QUIZ_DATA': 
        return {
            ...state,
            loadingState: 'LOADING',
        }

        case 'RECEIVE_QUIZ_DATA': 
        return {
            ...state,
            loadingState: 'LOADED',
            quiz: action.payload || [],
        }

        case 'ERROR_QUIZ_DATA': 
        return {
            ...state,
            loadingState: 'ERROR',
            error: action.payload,
        }

        default: return state;
    }
} 

export default appReducer;