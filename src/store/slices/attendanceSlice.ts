import { AttendanceRecord, AttendanceState } from "@/types/types";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

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
