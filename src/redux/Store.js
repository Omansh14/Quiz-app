import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import  ThunkMiddleware  from 'redux-thunk';
import appReducer from './reducers/appReducer';

const reducer = combineReducers({
    app: appReducer,
});

const initialState = {};

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(ThunkMiddleware)));

export default store;