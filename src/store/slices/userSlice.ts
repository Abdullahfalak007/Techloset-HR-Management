import { User, UserState } from "@/types/types";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: UserState = {
  me: undefined,
  all: [],
  loading: false,
};

// Fetch my profile
export const fetchMyProfile = createAsyncThunk("users/fetchMe", async () => {
  const res = await axios.get<User>("/api/profile");
  return res.data;
});

// Update my profile
export const updateMyProfile = createAsyncThunk(
  "users/updateMe",
  async (payload: { name: string; email: string; avatarUrl: string }) => {
    const res = await axios.patch<User>("/api/profile", payload);
    return res.data;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchMyProfile.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.loading = false;
          state.me = action.payload;
        }
      )
      .addCase(fetchMyProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(
        updateMyProfile.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.me = action.payload;
        }
      );
  },
});

export default userSlice.reducer;
