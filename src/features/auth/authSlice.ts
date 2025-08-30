import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api/auth";
import type { User } from "../../types";
import { remove, save } from "../../utils/persist";

interface AuthState {
  user: User | null;
  loading: boolean;
  error?: string;
}
const initialState: AuthState = { user: null, loading: false };

export const loginThunk = createAsyncThunk<
  User,
  { email: string; password: string }
>("auth/login", async ({ email, password }) => api.login(email, password));

export const registerThunk = createAsyncThunk<
  User,
  { email: string; password: string }
>("auth/register", async ({ email, password }) =>
  api.register(email, password)
);

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      remove("ocp_user");
    },
  },
  extraReducers: (b) => {
    b.addCase(loginThunk.pending, (s) => {
      s.loading = true;
      s.error = undefined;
    })
      .addCase(loginThunk.fulfilled, (s, a) => {
        s.loading = false;
        s.user = a.payload;
        save("ocp_user", a.payload);
      })
      .addCase(loginThunk.rejected, (s, a) => {
        s.loading = false;
        s.error = a.error.message;
      })
      .addCase(registerThunk.pending, (s) => {
        s.loading = true;
        s.error = undefined;
      })
      .addCase(registerThunk.fulfilled, (s, a) => {
        s.loading = false;
        s.user = a.payload;
        save("ocp_user", a.payload);
      })
      .addCase(registerThunk.rejected, (s, a) => {
        s.loading = false;
        s.error = a.error.message;
      });
  },
});

export const { logout } = slice.actions;
export default slice.reducer;
