// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";

// export interface AttendanceRecord {
//   /* … */
// }

// interface AttendanceState {
//   items: AttendanceRecord[];
//   loading: boolean;
//   error?: string;
// }

// const initialState: AttendanceState = {
//   items: [],
//   loading: false,
// };

// export const fetchAttendance = createAsyncThunk(
//   "attendance/fetchAll",
//   async () => {
//     const res = await axios.get<AttendanceRecord[]>("/api/attendance");
//     return res.data;
//   }
// );

// export const createAttendance = createAsyncThunk(
//   "attendance/create",
//   async (payload: { employeeId: string /* … */ }) => {
//     const res = await axios.post<AttendanceRecord>("/api/attendance", payload);
//     return res.data;
//   }
// );

// const attendanceSlice = createSlice({
//   name: "attendance",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAttendance.pending, (s) => {
//         s.loading = true;
//       })
//       .addCase(fetchAttendance.fulfilled, (s, a) => {
//         s.loading = false;
//         s.items = a.payload;
//       })
//       .addCase(fetchAttendance.rejected, (s, a) => {
//         s.loading = false;
//         s.error = a.error.message;
//       })
//       .addCase(createAttendance.fulfilled, (s, a) => {
//         s.items.unshift(a.payload);
//       });
//   },
// });

// export default attendanceSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  checkIn: string;
  checkOut: string;
  breakTime: string | null;
  workHours: string | null;
  status: string;
  employee: {
    id: string;
    name: string;
    avatar?: string;
    department: string;
    designation: string;
    type: string;
  };
}

interface AttendanceState {
  records: AttendanceRecord[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: AttendanceState = {
  records: [],
  status: "idle",
};

// Fetch all attendance
export const fetchAttendanceRecords = createAsyncThunk(
  "attendance/fetchAll",
  async () => {
    const res = await axios.get<AttendanceRecord[]>("/api/attendance");
    return res.data;
  }
);

// Create attendance record
export const createAttendance = createAsyncThunk(
  "attendance/create",
  async (payload: {
    employeeId: string;
    date: string;
    checkIn: string;
    checkOut: string;
    breakTime?: string;
    workHours?: string;
    status: string;
  }) => {
    const res = await axios.post<AttendanceRecord>("/api/attendance", payload);
    return res.data;
  }
);

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttendanceRecords.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchAttendanceRecords.fulfilled,
        (state, action: PayloadAction<AttendanceRecord[]>) => {
          state.status = "succeeded";
          state.records = action.payload;
        }
      )
      .addCase(fetchAttendanceRecords.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(
        createAttendance.fulfilled,
        (state, action: PayloadAction<AttendanceRecord>) => {
          state.records.unshift(action.payload);
        }
      );
  },
});

export default attendanceSlice.reducer;
