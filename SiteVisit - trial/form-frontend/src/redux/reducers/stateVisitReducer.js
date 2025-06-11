import { createAction, createReducer } from '@reduxjs/toolkit';

const createSiteVisitRequest = createAction('createSiteVisitRequest');
const createSiteVisitSuccess = createAction('createSiteVisitSuccess');
const createSiteVisitFail = createAction('createSiteVisitFail');
const getSiteVisitByUserIdRequest = createAction('getSiteVisitByUserIdRequest');
const getSiteVisitByUserIdSuccess = createAction('getSiteVisitByUserIdSuccess');
const getSiteVisitByUserIdFail = createAction('getSiteVisitByUserIdFail');
const clearError = createAction('clearError');
const clearMessage = createAction('clearMessage');

export const siteVisitReducer = createReducer({}, (builder) => {
    builder
        .addCase(createSiteVisitRequest, (state) => {
            state.loading = true;
        })
        .addCase(createSiteVisitSuccess, (state, action) => {
            state.loading = false;
            state.siteVisit = action.payload.siteVisits;
            state.message = action.payload.message;
        })
        .addCase(createSiteVisitFail, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(getSiteVisitByUserIdRequest, (state) => {
            state.loading = true;
        })
        .addCase(getSiteVisitByUserIdSuccess, (state, action) => {
            state.loading = false;
            state.siteVisits = action.payload.siteVisits;
        })
        .addCase(getSiteVisitByUserIdFail, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(clearError, (state) => {
            state.error = null;
        })
        .addCase(clearMessage, (state) => {
            state.message = null;
        });
})