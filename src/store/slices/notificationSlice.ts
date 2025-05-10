import { Notification, NotificationState } from "@/types/types";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: NotificationState = {
  items: [],
  loading: false,
};

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchAll",
  async () => {
    const res = await axios.get<Notification[]>("/api/notifications");
    return res.data;
  }
);

export const markNotificationRead = createAsyncThunk(
  "notifications/markRead",
  async ({ id, read }: { id: string; read: boolean }) => {
    const res = await axios.patch<Notification>(`/api/notifications/${id}`, {
      read,
    });
    return res.data;
  }
);

export const deleteNotification = createAsyncThunk(
  "notifications/delete",
  async (id: string) => {
    await axios.delete(`/api/notifications/${id}`);
    return id;
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (s) => {
        s.loading = true;
      })
      .addCase(
        fetchNotifications.fulfilled,
        (s, a: PayloadAction<Notification[]>) => {
          s.loading = false;
          s.items = a.payload;
        }
      )
      .addCase(fetchNotifications.rejected, (s, a) => {
        s.loading = false;
        s.error = a.error.message;
      })

      .addCase(
        markNotificationRead.fulfilled,
        (s, a: PayloadAction<Notification>) => {
          const idx = s.items.findIndex((n) => n.id === a.payload.id);
          if (idx !== -1) s.items[idx] = a.payload;
        }
      )

      .addCase(deleteNotification.fulfilled, (s, a: PayloadAction<string>) => {
        s.items = s.items.filter((n) => n.id !== a.payload);
      });
  },
});

export default notificationSlice.reducer;
