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
  "skipasses/fetchSkipasses",
  async ({ page, size }: { page: number; size: number }) => {
    const res = await axios.get<TResponse>(
      `/skipass?page=${page}&size=${size}`,
    );
    return res.data;
  },
);

export const addNewSkipass = createAsyncThunk(
  "skipasses/addNewSkipass",
  async (info: Skipass) => {
    const res = await axios.post<Skipass>("/skipass", info);
    return res.data;
  },
);

export const getSkipass = createAsyncThunk(
  "skipasses/getSkipass",
  async (id: string) => {
    const res = await axios.get<Skipass>(`/skipass/${id}`);
    return res.data;
  },
);

export const deleteSkipass = createAsyncThunk(
  "skipasses/deleteSkipass",
  async (id: string) => {
    const res = await axios.delete(`/skipass/${id}`);
    return res;
  },
);

export const addGuestToSkipass = createAsyncThunk(
  "skipasses/addGuestToSkipass",
  async ({
    guestId,
    skipassId,
  }: {
    guestId: string | unknown;
    skipassId: string;
  }) => {
    const res = await axios.put<Skipass>(
      `/skipass/${skipassId}/guest/${guestId}`,
    );
    return res.data;
  },
);

export const removeGuestFromSkipass = createAsyncThunk(
  "skipasses/removeGuestFromSkipass",
  async ({
    guestId,
    skipassId,
  }: {
    guestId: string | unknown;
    skipassId: string;
  }) => {
    const res = await axios.delete<Skipass>(
      `/skipass/${skipassId}/guest/${guestId}`,
    );
    return res.data;
  },
);

export const updateGuestToSkipass = createAsyncThunk(
  "skipasses/updateGuestToSkipass",
  async ({
    guestId,
    skipassId,
  }: {
    guestId: string | unknown;
    skipassId: string;
  }) => {
    const res = await axios.patch<Skipass>(
      `/skipass/${skipassId}/guest/${guestId}`,
    );
    return res.data;
  },
);

export const editSkipass = createAsyncThunk(
  "skipasses/edit",
  async ({ id, data }: { id: string; data: Skipass }) => {
    const res = await axios.patch<Skipass>(`/skipass/edit/${id}`, data);
    console.log(res.data);
    return res.data;
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
        state.skipassData = [action.payload, ...state.skipassData];
      })
      .addCase(deleteSkipass.fulfilled, (state, action) => {
        state.skipassData = state.skipassData.filter(
          (skipass) => skipass.id !== action.meta.arg,
        );
      })
      .addCase(addGuestToSkipass.fulfilled, (state, action) => {
        state.skipassData = state.skipassData.map((skipass) => {
          return skipass.id === action.meta.arg.skipassId
            ? action.payload
            : skipass;
        });
      })
      .addCase(removeGuestFromSkipass.fulfilled, (state, action) => {
        state.skipassData = state.skipassData.map((skipass) => {
          return skipass.id === action.meta.arg.skipassId
            ? action.payload
            : skipass;
        });
      })
      .addCase(updateGuestToSkipass.fulfilled, (state, action) => {
        state.skipassData = state.skipassData.map((skipass) => {
          return skipass.id === action.meta.arg.skipassId
            ? action.payload
            : skipass;
        });
      })
      .addCase(editSkipass.fulfilled, (state, action) => {
        state.skipassData = state.skipassData.map((skipass) => {
          return skipass.id === action.meta.arg.id ? action.payload : skipass;
        });
      });
  },
});

export const { setChosenSkipass, clearChosenSkipass } = skipassSlice.actions;

export default skipassSlice.reducer;
