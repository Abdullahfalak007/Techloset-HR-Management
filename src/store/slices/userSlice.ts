import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface User {
  id: string;
  name?: string;
  email?: string;
  role: string;
  image?: string;
}

interface UserState {
  me?: User;
  all: User[];
  loading: boolean;
  error?: string;
}

const initialState: UserState = { me: undefined, all: [], loading: false };

export const fetchMyProfile = createAsyncThunk("users/fetchMe", async () => {
  const res = await axios.get<User>("/api/profile");
  return res.data;
});

export const fetchUsers = createAsyncThunk("users/fetchAll", async () => {
  const res = await axios.get<User[]>("/api/users");
  return res.data;
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyProfile.fulfilled, (s, a: PayloadAction<User>) => {
        s.me = a.payload;
      })
      .addCase(fetchUsers.fulfilled, (s, a: PayloadAction<User[]>) => {
        s.all = a.payload;
      });
  },
});

export default userSlice.reducer;
