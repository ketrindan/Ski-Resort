import { TRegisterData } from "~entities/user/userSlice";

export const usersList: TRegisterData[] = [
  {
    id: 1,
    login: "Иван Абрамов",
    password: "123456",
    isAdmin: true,
  },
  {
    id: 2,
    login: "Чубакка",
    password: "123qaz",
    isAdmin: false,
  },
];
