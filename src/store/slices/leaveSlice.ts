// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";

// export interface Leave {
//   id: string;
//   employeeId: string;
//   reason: string;
//   startDate: string;
//   endDate: string;
//   status: "PENDING" | "APPROVED" | "REJECTED";
//   createdAt: string;
// }

// interface LeaveState {
//   items: Leave[];
//   loading: boolean;
//   error?: string;
// }

// const initialState: LeaveState = {
//   items: [],
//   loading: false,
// };

// export const fetchLeaves = createAsyncThunk("leaves/fetchAll", async () => {
//   const res = await axios.get<Leave[]>("/api/leaves");
//   return res.data;
// });

// export const createLeave = createAsyncThunk(
//   "leaves/create",
//   async (payload: {
//     employeeId: string;
//     reason: string;
//     startDate: string;
//     endDate: string;
//   }) => {
//     const res = await axios.post<Leave>("/api/leaves", payload);
//     return res.data;
//   }
// );

// export const updateLeaveStatus = createAsyncThunk(
//   "leaves/updateStatus",
//   async ({ id, status }: { id: string; status: "APPROVED" | "REJECTED" }) => {
//     const res = await axios.patch<Leave>(`/api/leaves/${id}`, { status });
//     return res.data;
//   }
// );

// const leaveSlice = createSlice({
//   name: "leaves",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchLeaves.pending, (s) => {
//         s.loading = true;
//       })
//       .addCase(fetchLeaves.fulfilled, (s, a: PayloadAction<Leave[]>) => {
//         s.loading = false;
//         s.items = a.payload;
//       })
//       .addCase(fetchLeaves.rejected, (s, a) => {
//         s.loading = false;
//         s.error = a.error.message;
//       })

//       .addCase(createLeave.fulfilled, (s, a: PayloadAction<Leave>) => {
//         s.items.unshift(a.payload);
//       })

//       .addCase(updateLeaveStatus.fulfilled, (s, a: PayloadAction<Leave>) => {
//         const idx = s.items.findIndex((l) => l.id === a.payload.id);
//         if (idx !== -1) s.items[idx] = a.payload;
//       });
//   },
// });

// export default leaveSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Leave {
  id: string;
  employeeId: string;
  reason: string;
  startDate: string;
  endDate: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
}

interface LeaveState {
  items: Leave[];
  loading: boolean;
  error?: string;
}

const initialState: LeaveState = {
  items: [],
  loading: false,
};

export const fetchLeaves = createAsyncThunk("leaves/fetchAll", async () => {
  const res = await axios.get<Leave[]>("/api/leaves");
  return res.data;
});

export const createLeave = createAsyncThunk(
  "leaves/create",
  async (payload: {
    employeeId: string;
    reason: string;
    startDate: string;
    endDate: string;
  }) => {
    const res = await axios.post<Leave>("/api/leaves", payload);
    return res.data;
  }
);

export const updateLeaveStatus = createAsyncThunk(
  "leaves/updateStatus",
  async ({ id, status }: { id: string; status: "APPROVED" | "REJECTED" }) => {
    const res = await axios.patch<Leave>(`/api/leaves/${id}`, { status });
    return res.data;
  }
);

const leaveSlice = createSlice({
  name: "leaves",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaves.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchLeaves.fulfilled, (s, a: PayloadAction<Leave[]>) => {
        s.loading = false;
        s.items = a.payload;
      })
      .addCase(fetchLeaves.rejected, (s, a) => {
        s.loading = false;
        s.error = a.error.message;
      })

      .addCase(createLeave.fulfilled, (s, a: PayloadAction<Leave>) => {
        s.items.unshift(a.payload);
      })

      .addCase(updateLeaveStatus.fulfilled, (s, a: PayloadAction<Leave>) => {
        const idx = s.items.findIndex((l) => l.id === a.payload.id);
        if (idx !== -1) s.items[idx] = a.payload;
      });
  },
});

export default leaveSlice.reducer;
