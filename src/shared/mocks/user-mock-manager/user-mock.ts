import { TRegisterData } from "~entities/user/userSlice";

type TUserData = TRegisterData & { id: string };

export const usersList: TUserData[] = [
  {
    id: "1",
    login: "Иван Абрамов",
    password: "123456",
    isAdmin: true,
  },
  {
    id: "2",
    login: "Чубакка",
    password: "123qaz",
    isAdmin: false,
  },
];
