import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define Employee Type
interface Employee {
  id: string;
  name: string;
  employeeId: string;
  department: string;
  designation: string;
  type: string;
  status: string;
  avatar?: string;
  createdAt: string;
  personalInfo?: any;
  professionalInfo?: any;
  documents?: any;
  accountLinks?: any;
}

interface EmployeeState {
  employees: Employee[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: EmployeeState = {
  employees: [],
  status: "idle",
};

// Create Employee
export const createEmployee = createAsyncThunk(
  "employee/create",
  async (data: any) => {
    const res = await axios.post("/api/employees", data);
    return res.data;
  }
);

// Update Employee
export const updateEmployee = createAsyncThunk(
  "employee/update",
  async ({ id, data }: { id: string; data: any }) => {
    const res = await axios.patch(`/api/employees/${id}`, data);
    return res.data;
  }
);

// Slice
const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        createEmployee.fulfilled,
        (state, action: PayloadAction<Employee>) => {
          state.employees.push(action.payload);
        }
      )
      .addCase(
        updateEmployee.fulfilled,
        (state, action: PayloadAction<Employee>) => {
          const index = state.employees.findIndex(
            (e) => e.id === action.payload.id
          );
          if (index !== -1) {
            state.employees[index] = action.payload;
          }
        }
      );
  },
});

export default employeeSlice.reducer;
