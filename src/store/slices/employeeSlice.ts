// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface Employee {
//   id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
// }

// interface EmployeeState {
//   employees: Employee[];
// }

// const initialState: EmployeeState = {
//   employees: [],
// };

// const employeeSlice = createSlice({
//   name: "employee",
//   initialState,
//   reducers: {
//     addEmployee(state, action: PayloadAction<Employee>) {
//       state.employees.push(action.payload);
//     },
//     // Add additional reducers for edit and delete as needed...
//   },
// });

// export const { addEmployee } = employeeSlice.actions;
// export default employeeSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Employee } from "../../types/types";

interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
}

const initialState: EmployeeState = {
  employees: [],
  loading: false,
  error: null,
};

export const fetchEmployees = createAsyncThunk(
  "employee/fetchAll",
  async () => {
    const res = await fetch("/api/employees");
    if (!res.ok) throw new Error("Failed to fetch employees");
    return res.json();
  }
);

export const createEmployee = createAsyncThunk(
  "employee/create",
  async (data: Partial<Employee>) => {
    const res = await fetch("/api/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create employee");
    return res.json();
  }
);

export const updateEmployee = createAsyncThunk(
  "employee/update",
  async ({ id, data }: { id: string; data: Partial<Employee> }) => {
    const res = await fetch(`/api/employees/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update employee");
    return res.json();
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.employees = action.payload;
        state.loading = false;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.employees.unshift(action.payload);
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const idx = state.employees.findIndex(
          (e) => e.id === action.payload.id
        );
        if (idx !== -1) state.employees[idx] = action.payload;
      });
  },
});

export default employeeSlice.reducer;
