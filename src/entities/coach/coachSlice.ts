import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TGuest } from "~entities/guest/guestSlice";
import { Person } from "~entities/person";
import { axios } from "~shared/api/interceptors";
import { Status } from "~shared/lib/status";

export type TCoach = Person & {
  sex?: string;
  skiPassId?: string;
  skiPassCost?: number;
  skiPassDuration?: string;
  category: string;
  photo?: string;
  guests: TGuest[];
};

export type TResponse = {
  content: TCoach[];
  totalPages: number;
};

interface coachState {
  allCoaches: TCoach[];
  coachesData: TCoach[];
  status: Status;
  error?: string | null;
  pages: number;
  chosenCoach: TCoach | null;
}

const initialState: coachState = {
  allCoaches: [],
  coachesData: [],
  status: Status.idle,
  error: null,
  pages: 0,
  chosenCoach: null,
};

export const fetchAllCoaches = createAsyncThunk(
  "coaches/fetchAllCoaches",
  async () => {
    const res = await axios.get<TCoach[]>(`/coach/all`);
    return res.data;
  },
);

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

export const addGuestToCoach = createAsyncThunk(
  "coaches/addGuestToCoach",
  async ({
    guestId,
    coachId,
  }: {
    guestId: string | unknown;
    coachId: string;
  }) => {
    const res = await axios.put<TCoach>(`/coach/${coachId}/guest/${guestId}`);
    return res.data;
  },
);

export const removeGuestFromCoach = createAsyncThunk(
  "coaches/removeGuestFromCoach",
  async ({
    guestId,
    coachId,
  }: {
    guestId: string | unknown;
    coachId: string;
  }) => {
    const res = await axios.delete<TCoach>(
      `/coach/${coachId}/guest/${guestId}`,
    );
    return res.data;
  },
);

export const updateGuestToCoach = createAsyncThunk(
  "coaches/updateGuestToCoach",
  async ({
    guestId,
    coachId,
  }: {
    guestId: string | unknown;
    coachId: string;
  }) => {
    const res = await axios.patch<TCoach>(`/coach/${coachId}/guest/${guestId}`);
    return res.data;
  },
);

export const deleteCoach = createAsyncThunk(
  "coaches/deleteCoach",
  async (id: string) => {
    const res = await axios.delete(`/coach/${id}`);
    return res;
  },
);

export const editCoach = createAsyncThunk(
  "coaches/editCoach",
  async ({ coachId, data }: { coachId: string; data: TCoach }) => {
    const res = await axios.patch<TCoach>(`/coach/edit/${coachId}`, data);
    return res.data;
  },
);

const coachSlice = createSlice({
  name: "coach",
  initialState,
  reducers: {
    setChosenCoach: (state, action: PayloadAction<TCoach>) => {
      state.chosenCoach = action.payload;
    },
    clearChosenCoach: (state) => {
      state.chosenCoach = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAllCoaches.fulfilled, (state, action) => {
        state.allCoaches = action.payload;
      })
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
      })
      .addCase(addGuestToCoach.fulfilled, (state, action) => {
        state.coachesData = state.coachesData.map((coach) => {
          return coach.id === action.meta.arg.coachId ? action.payload : coach;
        });
      })
      .addCase(removeGuestFromCoach.fulfilled, (state, action) => {
        state.coachesData = state.coachesData.map((coach) => {
          return coach.id === action.meta.arg.coachId ? action.payload : coach;
        });
      })
      .addCase(updateGuestToCoach.fulfilled, (state, action) => {
        state.coachesData = state.coachesData.map((coach) => {
          return coach.id === action.meta.arg.coachId ? action.payload : coach;
        });
      })
      .addCase(editCoach.fulfilled, (state, action) => {
        state.coachesData = state.coachesData.map((coach) => {
          return coach.id === action.meta.arg.coachId ? action.payload : coach;
        });
      });
  },
});

export const { setChosenCoach, clearChosenCoach } = coachSlice.actions;

export default coachSlice.reducer;
