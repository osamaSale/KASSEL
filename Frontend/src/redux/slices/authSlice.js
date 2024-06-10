// src/redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getAllCourses, login, register } from '../actions/authActions';

const initialState = {
    token: null,
    user: null,
    error: null,
    loading: false,
    courses: []
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            state.user = null;
            state.error = null;
            state.token =null
        },
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.token = action.payload?.token;
                state.user = action.payload?.user;
                state.loading = false;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
               
            })
            // Register
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
   
            })
            //courses
            .addCase(getAllCourses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllCourses.fulfilled, (state, action) => {
                state.courses = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(getAllCourses.rejected, (state, action) => {
                state.loading = false;
               
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
