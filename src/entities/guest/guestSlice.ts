import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Person } from "~entities/person";
import { axios } from "~shared/api/interceptors";
import { Status } from "~shared/lib/status";

export type TGuest = Person & {
  skiPassId?: string | null;
  coachId?: string | null;
  coachNameSurname?: string | null;
  coachCategory?: string | null;
  coachSex?: string | null;
  skiPassCost?: number | null;
  skiPassDuration?: string | null;
  visitDate: string;
};

export type TResponse = {
  content: TGuest[];
  totalPages: number;
};

interface guestState {
  guestsData: TGuest[];
  status: Status;
  error?: string | null;
  pages: number;
  chosenGuest: TGuest | null;
}

const initialState: guestState = {
  guestsData: [],
  status: Status.idle,
  error: null,
  pages: 0,
  chosenGuest: null,
};

export const fetchGuests = createAsyncThunk(
  "guests/fetchGuests",
  async ({ page, size }: { page: number; size: number }) => {
    const res = await axios.get<TResponse>(`/guest?page=${page}&size=${size}`);
    return res.data;
  },
);

export const addNewGuest = createAsyncThunk(
  "guests/addNewGuest",
  async (info: TGuest) => {
    const res = await axios.post<TGuest>("/guest", info);
    return res.data;
  },
);

export const getGuest = createAsyncThunk(
  "guests/getGuest",
  async (id: string) => {
    const res = await axios.get<TGuest>(`/guest/${id}`);
    return res.data;
  },
);

export const deleteGuest = createAsyncThunk(
  "guests/deleteGuest",
  async (id: string) => {
    const res = await axios.delete(`/guest/${id}`);
    return res;
  },
);

export const addCoachToGuest = createAsyncThunk(
  "guests/addCoachToGuest",
  async ({
    guestId,
    coachId,
  }: {
    guestId: string | unknown;
    coachId: string;
  }) => {
    const res = await axios.put(`/guest/${guestId}/coach/${coachId}`);
    return res;
  },
);

const guestSlice = createSlice({
  name: "guest",
  initialState,
  reducers: {
    setChosenGuest: (state, action: PayloadAction<TGuest>) => {
      state.chosenGuest = action.payload;
    },
    clearChosenGuest: (state) => {
      state.chosenGuest = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchGuests.pending, (state) => {
        state.status = Status.loading;
      })
      .addCase(fetchGuests.fulfilled, (state, action) => {
        state.status = Status.succeeded;
        state.guestsData = action.payload.content;
        state.pages = action.payload.totalPages;
      })
      .addCase(fetchGuests.rejected, (state, action) => {
        state.status = Status.failed;
        state.error = action.error.message;
      })
      .addCase(addNewGuest.fulfilled, (state, action) => {
        state.guestsData.push(action.payload);
      })
      .addCase(deleteGuest.fulfilled, (state, action) => {
        state.guestsData = state.guestsData.filter(
          (guest) => guest.id !== action.meta.arg,
        );
      });
  },
});

export const { setChosenGuest, clearChosenGuest } = guestSlice.actions;

export default guestSlice.reducer;
