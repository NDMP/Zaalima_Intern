import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login as loginApi } from '../../api/authApi';
import {
  clearAuth,
  getToken,
  getUser,
  setToken,
  setUser,
} from '../../services/storage';

const initialToken = getToken();
const initialUser = getUser();

const initialState = {
  user: initialUser,
  token: initialToken,
  isAuthenticated: Boolean(initialToken && initialUser),
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginApi(credentials);

      const data = response.data;

      if (!data.success || !data.token || !data.user) {
        return rejectWithValue(
          data.message || 'Login failed',
        );
      }

      setToken(data.token);
      setUser(data.user);

      return {
        token: data.token,
        user: data.user,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          'Unable to connect to the server',
      );
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      clearAuth();

      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },

    clearAuthError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
        state.isAuthenticated = false;
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;

export default authSlice.reducer;