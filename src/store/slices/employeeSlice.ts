import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Employee {
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

// ─── Thunks ────────────────────────────────────────────────────────────────────

// Fetch all employees
export const fetchEmployees = createAsyncThunk(
  "employees/fetchAll",
  async () => {
    const res = await axios.get<Employee[]>("/api/employees");
    return res.data;
  }
);

// Fetch a single employee by ID
export const fetchEmployeeById = createAsyncThunk(
  "employees/fetchById",
  async (id: string) => {
    const res = await axios.get<Employee>(`/api/employees/${id}`);
    return res.data;
  }
);

// Create new employee
export const createEmployee = createAsyncThunk(
  "employees/create",
  async (data: any) => {
    const res = await axios.post<Employee>("/api/employees", data);
    return res.data;
  }
);

// Update an employee
export const updateEmployee = createAsyncThunk(
  "employees/update",
  async ({ id, data }: { id: string; data: any }) => {
    const res = await axios.patch<Employee>(`/api/employees/${id}`, data);
    return res.data;
  }
);

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchAll
      .addCase(fetchEmployees.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchEmployees.fulfilled,
        (state, action: PayloadAction<Employee[]>) => {
          state.status = "succeeded";
          state.employees = action.payload;
        }
      )
      .addCase(fetchEmployees.rejected, (state) => {
        state.status = "failed";
      })

      // fetchById
      .addCase(
        fetchEmployeeById.fulfilled,
        (state, action: PayloadAction<Employee>) => {
          const idx = state.employees.findIndex(
            (e) => e.id === action.payload.id
          );
          if (idx !== -1) {
            state.employees[idx] = action.payload;
          } else {
            state.employees.push(action.payload);
          }
        }
      )

      // create
      .addCase(
        createEmployee.fulfilled,
        (state, action: PayloadAction<Employee>) => {
          state.employees.push(action.payload);
        }
      )

      // update
      .addCase(
        updateEmployee.fulfilled,
        (state, action: PayloadAction<Employee>) => {
          const idx = state.employees.findIndex(
            (e) => e.id === action.payload.id
          );
          if (idx !== -1) state.employees[idx] = action.payload;
        }
      );
  },
});

export default employeeSlice.reducer;
