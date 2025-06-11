import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/userReducer';
import { siteVisitReducer } from './reducers/stateVisitReducer';
import { itemReducer } from './reducers/itemReducer';
import { supplierReducer } from './reducers/supplierReducer';


const store = configureStore({
    reducer: {
        user: userReducer,
        siteVisit: siteVisitReducer,
        item: itemReducer,
        supplier: supplierReducer
    }
})

export default store

export const server = process.env.REACT_APP_SERVER_URL;
