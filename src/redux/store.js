import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {tokenReducer}  from "./reducers";
import AsyncStorage from '@react-native-async-storage/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel2
};

const rootReducer = combineReducers({tokenReducer})

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const Store = createStore(persistedReducer, applyMiddleware(thunk))

export const persistor = persistStore(Store);

