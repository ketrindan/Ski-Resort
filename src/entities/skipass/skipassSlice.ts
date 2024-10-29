import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Skipass } from "~entities/skipass";
import { axios } from "~shared/api/interceptors";
import { Status } from "~shared/lib/status";

export type TResponse = {
  content: Skipass[];
  totalPages: number;
};

interface skipassState {
  skipassData: Skipass[];
  status: Status;
  error?: string | null;
  pages: number;
  chosenSkipass: Skipass | null;
}

const initialState: skipassState = {
  skipassData: [],
  status: Status.idle,
  error: null,
  pages: 0,
  chosenSkipass: null,
};

export const fetchSkipasses = createAsyncThunk(
  "guests/fetchSkipasses",
  async ({ page, size }: { page: number; size: number }) => {
    const res = await axios.get<TResponse>(
      `/skipass?page=${page}&size=${size}`,
    );
    return res.data;
  },
);

export const addNewSkipass = createAsyncThunk(
  "guests/addNewGuest",
  async (info: Skipass) => {
    const res = await axios.post<Skipass>("/skipass", info);
    return res.data;
  },
);

export const getSkipass = createAsyncThunk(
  "guests/getSkipass",
  async (id: string) => {
    const res = await axios.get<Skipass>(`/skipass/${id}`);
    return res.data;
  },
);

export const deleteSkipass = createAsyncThunk(
  "guests/deleteSkipass",
  async (id: string) => {
    const res = await axios.delete(`/skipass/${id}`);
    return res;
  },
);

export const addSkipassToGuest = createAsyncThunk(
  "guests/addSkipassToGuest",
  async ({
    guestId,
    skipassId,
  }: {
    guestId: string | unknown;
    skipassId: string;
  }) => {
    const res = await axios.put(`/guest/${guestId}/skipass/${skipassId}`);
    return res;
  },
);

const skipassSlice = createSlice({
  name: "skipass",
  initialState,
  reducers: {
    setChosenSkipass: (state, action: PayloadAction<Skipass>) => {
      state.chosenSkipass = action.payload;
    },
    clearChosenSkipass: (state) => {
      state.chosenSkipass = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSkipasses.pending, (state) => {
        state.status = Status.loading;
      })
      .addCase(fetchSkipasses.fulfilled, (state, action) => {
        state.status = Status.succeeded;
        state.skipassData = action.payload.content;
        state.pages = action.payload.totalPages;
      })
      .addCase(fetchSkipasses.rejected, (state, action) => {
        state.status = Status.failed;
        state.error = action.error.message;
      })
      .addCase(addNewSkipass.fulfilled, (state, action) => {
        state.skipassData.push(action.payload);
      })
      .addCase(deleteSkipass.fulfilled, (state, action) => {
        state.skipassData = state.skipassData.filter(
          (guest) => guest.id !== action.meta.arg,
        );
      });
  },
});

export const { setChosenSkipass, clearChosenSkipass } = skipassSlice.actions;

export default skipassSlice.reducer;
