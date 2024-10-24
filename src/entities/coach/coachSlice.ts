import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TGuest } from "~entities/guest/guestSlice";
import { Person } from "~entities/person";
import { axios } from "~shared/api/interceptors";
import { Status } from "~shared/lib/status";

export type TCoach = Person & {
  sex?: string | null;
  skiPassId?: number | null;
  skiPassCost?: number | null;
  skiPassDuration?: string | null;
  category: string;
  photo?: string;
  guests?: TGuest[] | null;
};

export type TResponse = {
  content: TCoach[];
  totalPages: number;
};

interface coachState {
  coachesData: TCoach[];
  status: Status;
  error?: string | null;
  pages: number;
  chosenCoach: TCoach | null;
}

const initialState: coachState = {
  coachesData: [],
  status: Status.idle,
  error: null,
  pages: 0,
  chosenCoach: null,
};

export const fetchCoaches = createAsyncThunk(
  "coaches/fetchCoaches",
  async ({ page, size }: { page: number; size: number }) => {
    const res = await axios.get<TResponse>(`/coach?page=${page}&size=${size}`);
    return res.data;
  },
);

export const addNewCoach = createAsyncThunk(
  "coaches/addNewCoach",
  async (info: TCoach) => {
    const res = await axios.post<TCoach>("/coach", info);
    return res.data;
  },
);

export const deleteCoach = createAsyncThunk(
  "coaches/deleteCoach",
  async (id: number) => {
    const res = await axios.delete(`/coach/${id}`);
    return res;
  },
);

const coachSlice = createSlice({
  name: "coach",
  initialState,
  reducers: {
    setChosenCoach: (state, action) => {
      state.chosenCoach = action.payload.payload;
    },
    clearChosenCoach: (state) => {
      state.chosenCoach = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCoaches.pending, (state) => {
        state.status = Status.loading;
      })
      .addCase(fetchCoaches.fulfilled, (state, action) => {
        state.status = Status.succeeded;
        state.coachesData = action.payload.content;
        state.pages = action.payload.totalPages;
      })
      .addCase(fetchCoaches.rejected, (state, action) => {
        state.status = Status.failed;
        state.error = action.error.message;
      })
      .addCase(addNewCoach.fulfilled, (state, action) => {
        state.coachesData = [action.payload, ...state.coachesData];
      })
      .addCase(deleteCoach.fulfilled, (state, action) => {
        state.coachesData = state.coachesData.filter(
          (coach) => coach.id !== action.meta.arg,
        );
      });
  },
});

export const { setChosenCoach, clearChosenCoach } = coachSlice.actions;

export default coachSlice.reducer;
