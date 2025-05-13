// // import { Employee, EmployeeState } from "@/types/types";
// // import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// // import axios from "axios";

// // const initialState: EmployeeState = {
// //   employees: [],
// //   status: "idle",
// // };

// // // ─── Thunks ────────────────────────────────────────────────────────────────────

// // // Fetch all employees
// // export const fetchEmployees = createAsyncThunk(
// //   "employees/fetchAll",
// //   async () => {
// //     const res = await axios.get<Employee[]>("/api/employees");
// //     return res.data;
// //   }
// // );

// // // Fetch a single employee by ID
// // export const fetchEmployeeById = createAsyncThunk(
// //   "employees/fetchById",
// //   async (id: string) => {
// //     const res = await axios.get<Employee>(`/api/employees/${id}`);
// //     return res.data;
// //   }
// // );

// // // Create new employee
// // export const createEmployee = createAsyncThunk(
// //   "employees/create",
// //   async (data: any) => {
// //     const res = await axios.post<Employee>("/api/employees", data);
// //     return res.data;
// //   }
// // );

// // // Update an employee
// // export const updateEmployee = createAsyncThunk(
// //   "employees/update",
// //   async ({ id, data }: { id: string; data: any }) => {
// //     const res = await axios.patch<Employee>(`/api/employees/${id}`, data);
// //     return res.data;
// //   }
// // );

// // const employeeSlice = createSlice({
// //   name: "employees",
// //   initialState,
// //   reducers: {},
// //   extraReducers: (builder) => {
// //     builder
// //       // fetchAll
// //       .addCase(fetchEmployees.pending, (state) => {
// //         state.status = "loading";
// //       })
// //       .addCase(
// //         fetchEmployees.fulfilled,
// //         (state, action: PayloadAction<Employee[]>) => {
// //           state.status = "succeeded";
// //           state.employees = action.payload;
// //         }
// //       )
// //       .addCase(fetchEmployees.rejected, (state) => {
// //         state.status = "failed";
// //       })

// //       // fetchById
// //       .addCase(
// //         fetchEmployeeById.fulfilled,
// //         (state, action: PayloadAction<Employee>) => {
// //           const idx = state.employees.findIndex(
// //             (e) => e.id === action.payload.id
// //           );
// //           if (idx !== -1) {
// //             state.employees[idx] = action.payload;
// //           } else {
// //             state.employees.push(action.payload);
// //           }
// //         }
// //       )

// //       // create
// //       .addCase(
// //         createEmployee.fulfilled,
// //         (state, action: PayloadAction<Employee>) => {
// //           state.employees.push(action.payload);
// //         }
// //       )

// //       // update
// //       .addCase(
// //         updateEmployee.fulfilled,
// //         (state, action: PayloadAction<Employee>) => {
// //           const idx = state.employees.findIndex(
// //             (e) => e.id === action.payload.id
// //           );
// //           if (idx !== -1) state.employees[idx] = action.payload;
// //         }
// //       );
// //   },
// // });

// // export default employeeSlice.reducer;

// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { Employee, EmployeeState } from "@/types/types";

// const initialState: EmployeeState = {
//   employees: [],
//   status: "idle",
// };

// export const fetchEmployees = createAsyncThunk(
//   "employees/fetchAll",
//   async () => {
//     const res = await axios.get<Employee[]>("/api/employees");
//     return res.data;
//   }
// );

// export const fetchEmployeeById = createAsyncThunk(
//   "employees/fetchById",
//   async (id: string) => {
//     const res = await axios.get<Employee>(`/api/employees/${id}`);
//     return res.data;
//   }
// );

// export const createEmployee = createAsyncThunk(
//   "employees/create",
//   async (data) => {
//     const res = await axios.post<Employee>("/api/employees", data);
//     return res.data;
//   }
// );

// export const updateEmployee = createAsyncThunk(
//   "employees/update",
//   async ({ id, data }: { id: string; data: any }) => {
//     const res = await axios.patch<Employee>(`/api/employees/${id}`, data);
//     return res.data;
//   }
// );

// const employeeSlice = createSlice({
//   name: "employees",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchEmployees.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchEmployees.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.employees = action.payload;
//       })
//       .addCase(fetchEmployees.rejected, (state) => {
//         state.status = "failed";
//         toast.error("Failed to load employees");
//       })

//       .addCase(fetchEmployeeById.fulfilled, (state, action) => {
//         const idx = state.employees.findIndex(
//           (e) => e.id === action.payload.id
//         );
//         if (idx > -1) state.employees[idx] = action.payload;
//         else state.employees.push(action.payload);
//       })
//       .addCase(fetchEmployeeById.rejected, () => {
//         toast.error("Failed to fetch employee details");
//       })

//       .addCase(createEmployee.fulfilled, (state, action) => {
//         state.employees.push(action.payload);
//         toast.success("Employee created successfully");
//       })
//       .addCase(createEmployee.rejected, (action) => {
//         toast.error("Failed to create employee");
//       })

//       .addCase(updateEmployee.fulfilled, (state, action) => {
//         const idx = state.employees.findIndex(
//           (e) => e.id === action.payload.id
//         );
//         if (idx > -1) state.employees[idx] = action.payload;
//         toast.success("Employee updated successfully");
//       })
//       .addCase(updateEmployee.rejected, (action) => {
//         toast.error("Failed to update employee");
//       });
//   },
// });

// export default employeeSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { Employee, EmployeeState } from "@/types/types";

const initialState: EmployeeState = {
  employees: [],
  status: "idle",
};

// — Fetch All —
export const fetchEmployees = createAsyncThunk<Employee[], void>(
  "employees/fetchAll",
  async () => {
    const res = await axios.get<Employee[]>("/api/employees");
    return res.data;
  }
);

// — Fetch One —
export const fetchEmployeeById = createAsyncThunk<Employee, string>(
  "employees/fetchById",
  async (id) => {
    const res = await axios.get<Employee>(`/api/employees/${id}`);
    return res.data;
  }
);

// — Create —
export const createEmployee = createAsyncThunk<Employee, any>(
  "employees/create",
  async (data) => {
    const res = await axios.post<Employee>("/api/employees", data);
    return res.data;
  }
);

// — Update —
export const updateEmployee = createAsyncThunk<
  Employee,
  { id: string; data: any }
>("employees/update", async ({ id, data }) => {
  const res = await axios.patch<Employee>(`/api/employees/${id}`, data);
  return res.data;
});

// — Delete —
export const deleteEmployee = createAsyncThunk<string, string>(
  "employees/delete",
  async (id) => {
    await axios.delete(`/api/employees/${id}`);
    return id;
  }
);

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b
      // fetchAll
      .addCase(fetchEmployees.pending, (s) => {
        s.status = "loading";
      })
      .addCase(fetchEmployees.fulfilled, (s, a: PayloadAction<Employee[]>) => {
        s.status = "succeeded";
        s.employees = a.payload;
      })
      .addCase(fetchEmployees.rejected, () => {
        toast.error("Failed to load employees");
      })

      // fetchById
      .addCase(fetchEmployeeById.fulfilled, (s, a: PayloadAction<Employee>) => {
        const idx = s.employees.findIndex((e) => e.id === a.payload.id);
        if (idx > -1) s.employees[idx] = a.payload;
        else s.employees.push(a.payload);
      })
      .addCase(fetchEmployeeById.rejected, () => {
        toast.error("Failed to load employee details");
      })

      // create
      .addCase(createEmployee.fulfilled, (s, a: PayloadAction<Employee>) => {
        s.employees.push(a.payload);
        toast.success("Employee created successfully");
      })
      .addCase(createEmployee.rejected, () => {
        toast.error("Failed to create employee");
      })

      // update
      .addCase(updateEmployee.fulfilled, (s, a: PayloadAction<Employee>) => {
        const idx = s.employees.findIndex((e) => e.id === a.payload.id);
        if (idx > -1) s.employees[idx] = a.payload;
        toast.success("Employee updated successfully");
      })
      .addCase(updateEmployee.rejected, () => {
        toast.error("Failed to update employee");
      })

      // delete
      .addCase(deleteEmployee.fulfilled, (s, a: PayloadAction<string>) => {
        s.employees = s.employees.filter((e) => e.id !== a.payload);
        toast.success("Employee deleted");
      })
      .addCase(deleteEmployee.rejected, () => {
        toast.error("Failed to delete employee");
      });
  },
});

export default employeeSlice.reducer;
