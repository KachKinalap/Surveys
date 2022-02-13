import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import tokenReducer from "./reducers";

const rootReducer = combineReducers({tokenReducer})

export const Store = createStore(rootReducer, applyMiddleware(thunk))
