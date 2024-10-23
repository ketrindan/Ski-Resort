import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axios } from "~shared/api/interceptors";
import { Status } from "~shared/lib/status";

export type TUser = {
  login: string;
  isAdmin: boolean;
};

export type TUserData = TUser & {
  id: string;
};

export type TRegisterData = TUser & {
  password: string;
};

export type TAuthData = Omit<TRegisterData, "isAdmin">;

type TResponse = {
  content: TUserData;
  token: string;
};

interface userState {
  isLoggedIn: boolean;
  userData: TUser & { id: string };
  role: string;
  isAdminMode: boolean;
  status: Status;
  error?: string | null;
}

const initialState: userState = {
  isLoggedIn: false,
  userData: { id: "", login: "", isAdmin: false },
  role: "",
  isAdminMode: false,
  status: Status.idle,
  error: null,
};

export const register = createAsyncThunk(
  "user/register",
  async (data: TRegisterData) => {
    const res = await axios.post<TUser>("/register", data);
    return res.data;
  },
);

export const login = createAsyncThunk("user/login", async (data: TAuthData) => {
  const res = await axios.post<TResponse>("/login", data);
  return res.data;
});

export const editUser = createAsyncThunk(
  "user/edit",
  async (data: { id: string; login: string }) => {
    const res = await axios.patch<TUser["login"]>("/edit", data);
    console.log(res.data);
    return res.data;
  },
);

// export const getPassword = createAsyncThunk(
//   "user/password",
//   async (id: string) => {
//     const res = await axios.get<string>(`/password/${id}`);
//     return res.data;
//   },
// );

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state) => {
      state.isLoggedIn = false;
      state.userData.login = "";
      state.userData.isAdmin = false;
      state.userData.id = "";
      state.role = "";
      state.isAdminMode = false;
      localStorage.removeItem("token");
    },
    toggleAdminMode: (state) => {
      state.isAdminMode = !state.isAdminMode;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(register.pending, (state) => {
        state.status = Status.loading;
        state.error = "";
      })
      .addCase(register.fulfilled, (state) => {
        state.status = Status.succeeded;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = Status.failed;
        const errorCode = action.error.message?.slice(-3);
        switch (errorCode) {
          case "403":
            state.error = `Пользователь с таким логином уже существует`;
            break;
          default:
            state.error = "Произошла ошибка";
        }
      })
      .addCase(login.pending, (state) => {
        state.status = Status.loading;
        state.error = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = Status.succeeded;
        state.isLoggedIn = true;
        state.userData.login = action.payload.content.login;
        state.userData.id = action.payload.content.id;
        state.role = action.payload.content.isAdmin ? "Администратор" : "Гость";
        const accessToken = action.payload.token.split("Bearer ")[1];
        localStorage.setItem("token", accessToken);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = Status.failed;
        const errorCode = action.error.message?.slice(-3);
        switch (errorCode) {
          case "400":
            state.error = "Неверный пароль";
            break;
          case "404":
            state.error = "Пользователь не найден";
            break;
          default:
            state.error = "Произошла ошибка";
        }
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.status = Status.succeeded;
        state.userData.login = action.payload;
      });
  },
});

export const { logOut, toggleAdminMode } = userSlice.actions;

export default userSlice.reducer;
