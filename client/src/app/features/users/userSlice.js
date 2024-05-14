import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: null,
    loading: false,
    error: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        registrationStart: (state) => {
            state.loading = true
            state.error = null
        },
        registrationSuccess: (state, action) => {
            state.loading = false
            state.userInfo = action.payload
            state.error = null
        },
        registrationFailed: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        loginStart: (state) => {
            state.loading = true
            state.error = null
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.userInfo = action.payload;
            state.error = null;
        },
        loginFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateStart: (state) => {
            state.loading = true
            state.error = null
        },
        updateSuccess: (state, action) => {
            state.userInfo = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logOutUser: (state) => {
            state.userInfo = null
            state.loading = false;
            state.error = null;
        }
    }
})

export const {
    registrationStart,
    registrationSuccess,
    registrationFailed,
    loginStart,
    loginSuccess,
    loginFailed,
    updateStart,
    updateSuccess,
    updateFailed,
    logOutUser } = authSlice.actions

export default authSlice.reducer