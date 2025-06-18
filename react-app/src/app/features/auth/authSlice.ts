import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import type { AuthState, User } from './types';
import { signInAPI, signUpAPI, getUserAPI } from './authAPI';

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token') || '',
  loading: false,
  error: null,
};

// ------------------- SIGN IN -------------------
export const signIn = createAsyncThunk<
  { token: string },
  { email: string; password: string },
  { rejectValue: string }
>('auth/signIn', async (credentials, thunkAPI) => {
  try {
    const response = await signInAPI(credentials);
    localStorage.setItem('token', response.token);

    // одразу витягнути юзера після успішного логіну
    await thunkAPI.dispatch(getUser());

    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue('Sign in failed');
  }
});

// ------------------- SIGN UP -------------------
export const signUp = createAsyncThunk(
  'auth/signUp',
  async (
    credentials: { fullName: string; email: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await signUpAPI(credentials);
      localStorage.setItem('token', response.token);

      // одразу після реєстрації — завантажити користувача
      await thunkAPI.dispatch(getUser());

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue('Sign up failed');
    }
  }
);

// ------------------- GET USER -------------------
export const getUser = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>('auth/getUser', async (_, thunkAPI) => {
  try {
    return await getUserAPI();
  } catch {
    return thunkAPI.rejectWithValue('Get user failed');
  }
});

// ------------------- SLICE -------------------
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut(state) {
      state.user = null;
      state.token = '';
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder

      // ----- SIGN IN -----
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Sign in error';
      })

      // ----- SIGN UP -----
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Sign up error';
      })

      // ----- GET USER -----
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'User loading failed';
      });
  },
});

export const { signOut } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
