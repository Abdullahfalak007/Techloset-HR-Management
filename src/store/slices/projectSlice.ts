import { Project, ProjectState } from "@/types/types";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: ProjectState = {
  items: [],
  loading: false,
};

export const fetchProjects = createAsyncThunk("projects/fetchAll", async () => {
  const res = await axios.get<Project[]>("/api/projects");
  return res.data;
});

export const createProject = createAsyncThunk(
  "projects/create",
  async (payload: {
    title: string;
    description?: string;
    startDate: string;
    endDate: string;
    employeeId: string;
  }) => {
    const res = await axios.post<Project>("/api/projects", payload);
    return res.data;
  }
);

export const patchProjectStatus = createAsyncThunk(
  "projects/patchStatus",
  async ({
    id,
    status,
  }: {
    id: string;
    status: "IN_PROGRESS" | "COMPLETED";
  }) => {
    const res = await axios.patch<Project>(`/api/projects/${id}`, { status });
    return res.data;
  }
);

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (s, a: PayloadAction<Project[]>) => {
        s.loading = false;
        s.items = a.payload;
      })
      .addCase(fetchProjects.rejected, (s, a) => {
        s.loading = false;
        s.error = a.error.message;
      })

      .addCase(createProject.fulfilled, (s, a: PayloadAction<Project>) => {
        s.items.unshift(a.payload);
      })

      .addCase(patchProjectStatus.fulfilled, (s, a: PayloadAction<Project>) => {
        const idx = s.items.findIndex((p) => p.id === a.payload.id);
        if (idx !== -1) s.items[idx] = a.payload;
      });
  },
});

export default projectSlice.reducer;
