import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface EmployeeState {
  employees: Employee[];
}

const initialState: EmployeeState = {
  employees: [],
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    addEmployee(state, action: PayloadAction<Employee>) {
      state.employees.push(action.payload);
    },
    // Add additional reducers for edit and delete as needed...
  },
});

export const { addEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
