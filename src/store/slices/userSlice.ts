// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";

// export interface User {
//   id: string;
//   name?: string;
//   email?: string;
//   role: string;
//   image?: string;
// }

// interface UserState {
//   me?: User;
//   all: User[];
//   loading: boolean;
//   error?: string;
// }

// const initialState: UserState = { me: undefined, all: [], loading: false };

// export const fetchMyProfile = createAsyncThunk("users/fetchMe", async () => {
//   const res = await axios.get<User>("/api/profile");
//   return res.data;
// });

// export const fetchUsers = createAsyncThunk("users/fetchAll", async () => {
//   const res = await axios.get<User[]>("/api/users");
//   return res.data;
// });

// const userSlice = createSlice({
//   name: "users",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchMyProfile.fulfilled, (s, a: PayloadAction<User>) => {
//         s.me = a.payload;
//       })
//       .addCase(fetchUsers.fulfilled, (s, a: PayloadAction<User[]>) => {
//         s.all = a.payload;
//       });
//   },
// });

// export default userSlice.reducer;

// src/store/slices/userSlice.ts

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
