import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import instance from './axios';

export const login = createAsyncThunk("login", async (user, { rejectWithValue }) => {
    const res = await axios.post(`auth/login`, user)
    return res.data
})

export const register = createAsyncThunk("register", async (user, { rejectWithValue }) => {
    const res = await axios.post(`auth/register`, user)
    return res.data
})

export const logout = () => (dispatch) => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
};

export const getAllCourses = createAsyncThunk('getAllCourses', async () => {
    const res = await instance.get(`courses`)
    return res.data

});