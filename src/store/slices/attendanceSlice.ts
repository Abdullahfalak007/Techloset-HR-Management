import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Attendance {
  id: string;
  employeeId: string;
  date: string;
  status: "present" | "absent" | "leave";
}

interface AttendanceState {
  records: Attendance[];
}

const initialState: AttendanceState = {
  records: [],
};

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    addAttendance(state, action: PayloadAction<Attendance>) {
      state.records.push(action.payload);
    },
    // Add additional reducers for updates as needed...
  },
});

export const { addAttendance } = attendanceSlice.actions;
export default attendanceSlice.reducer;
