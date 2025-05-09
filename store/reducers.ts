import { createSlice } from '@reduxjs/toolkit';
import { fetchUserThunk, updateUserThunk } from './actions';
import { User } from '@/apis/user';

export interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetStatus(state) {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch user';
      })

      // UPDATE
      .addCase(updateUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Update failed';
        state.success = false;
      });
  },
});

export const { resetStatus } = userSlice.actions;
export default userSlice.reducer;
