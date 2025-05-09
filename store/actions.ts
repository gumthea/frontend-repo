import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserDataApi, updateUserDataApi, logoutUser } from '@/apis/userApi';

export const fetchUserThunk = createAsyncThunk(
  'user/fetchUser',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await fetchUserDataApi(token);
      return response.data;
    } catch (error: any) {
      const status = error.response?.status;

      if (status === 401) {
        // Token expired or invalid, force logout
        await logoutUser();
        window.location.href = '/'; // Redirect to login
        return rejectWithValue('Session expired. Please log in again.');
      }

      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateUserThunk = createAsyncThunk(
  'user/updateUser',
  async ({ token, data }: { token: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await updateUserDataApi(token, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
