import { createAction, createReducer } from "@reduxjs/toolkit";

const createItemRequest = createAction('createItemRequest');
const createItemSuccess = createAction('createItemSuccess');
const createItemFail = createAction('createItemFail');
const getAllItemsRequest = createAction('getAllItemsRequest');
const getAllItemsSuccess = createAction('getAllItemsSuccess');
const getAllItemsFail = createAction('getAllItemsFail');
const getItemByIdRequest = createAction('getItemByIdRequest');
const getItemByIdSuccess = createAction('getItemByIdSuccess');
const getItemByIdFail = createAction('getItemByIdFail');
const createInventoryInwardRequest = createAction('createInventoryInwardRequest');
const createInventoryInwardSuccess = createAction('createInventoryInwardSuccess');
const createInventoryInwardFail = createAction('createInventoryInwardFail');
const createInventoryOutwardRequest = createAction('createInventoryOutwardRequest');
const createInventoryOutwardSuccess = createAction('createInventoryOutwardSuccess');
const createInventoryOutwardFail = createAction('createInventoryOutwardFail');
const getAllInventoryInwardRequest = createAction('getAllInventoryInwardRequest');
const getAllInventoryInwardSuccess = createAction('getAllInventoryInwardSuccess');
const getAllInventoryInwardFail = createAction('getAllInventoryInwardFail');
const getAllInventoryOutwardRequest = createAction('getAllInventoryOutwardRequest');
const getAllInventoryOutwardSuccess = createAction('getAllInventoryOutwardSuccess');
const getAllInventoryOutwardFail = createAction('getAllInventoryOutwardFail');
const clearError = createAction('clearError');
const clearMessage = createAction('clearMessage');

export const itemReducer = createReducer({}, (builder) => {
    builder
        .addCase(createItemRequest, (state) => {
            state.loading = true;
        })
        .addCase(createItemSuccess, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        })
        .addCase(createItemFail, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(getAllItemsRequest, (state) => {
            state.loading = true;
        })
        .addCase(getAllItemsSuccess, (state, action) => {
            state.loading = false;
            state.items = action.payload.items;
        })
        .addCase(getAllItemsFail, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(getItemByIdRequest, (state) => {
            state.loading = true;
        })
        .addCase(getItemByIdSuccess, (state, action) => {
            state.loading = false;
            state.item = action.payload.item;
        })
        .addCase(getItemByIdFail, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(createInventoryInwardRequest, (state) => {
            state.loading = true;
        })
        .addCase(createInventoryInwardSuccess, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        })
        .addCase(createInventoryInwardFail, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(createInventoryOutwardRequest, (state) => {
            state.loading = true;
        })
        .addCase(createInventoryOutwardSuccess, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        })
        .addCase(createInventoryOutwardFail, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(getAllInventoryInwardRequest, (state) => {
            state.loading = true;
        })
        .addCase(getAllInventoryInwardSuccess, (state, action) => {
            state.loading = false;
            state.inventoryInwards = action.payload.inventoryInward;
        })
        .addCase(getAllInventoryInwardFail, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(getAllInventoryOutwardRequest, (state) => {
            state.loading = true;
        })
        .addCase(getAllInventoryOutwardSuccess, (state, action) => {
            state.loading = false;
            state.inventoryOutwards = action.payload.inventoryOutward;
        })
        .addCase(getAllInventoryOutwardFail, (state, action) => {
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