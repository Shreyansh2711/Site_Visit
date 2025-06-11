import { createAction, createReducer } from "@reduxjs/toolkit";

const createSupplierRequest = createAction('createSupplierRequest');
const createSupplierSuccess = createAction('createSupplierSuccess');
const createSupplierFail = createAction('createSupplierFail');
const getAllSuppliersRequest = createAction('getAllSuppliersRequest');
const getAllSuppliersSuccess = createAction('getAllSuppliersSuccess');
const getAllSuppliersFail = createAction('getAllSuppliersFail');
const getSupplierByIdRequest = createAction('getSupplierByIdRequest');
const getSupplierByIdSuccess = createAction('getSupplierByIdSuccess');
const getSupplierByIdFail = createAction('getSupplierByIdFail');
const clearError = createAction('clearError');
const clearMessage = createAction('clearMessage');

export const supplierReducer = createReducer({}, (builder) => {
    builder
        .addCase(createSupplierRequest, (state) => {
            state.loading = true;
        })
        .addCase(createSupplierSuccess, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        })
        .addCase(createSupplierFail, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(getAllSuppliersRequest, (state) => {
            state.loading = true;
        })
        .addCase(getAllSuppliersSuccess, (state, action) => {
            state.loading = false;
            state.suppliers = action.payload.suppliers;
        })
        .addCase(getAllSuppliersFail, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(getSupplierByIdRequest, (state) => {
            state.loading = true;
        })
        .addCase(getSupplierByIdSuccess, (state, action) => {
            state.loading = false;
            state.supplier = action.payload.supplier;
        })
        .addCase(getSupplierByIdFail, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(clearError, (state) => {
            state.error = null;
        })
        .addCase(clearMessage, (state) => {
            state.message = null;
        });
});