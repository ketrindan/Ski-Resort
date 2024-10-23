import { HttpResponse } from "msw";
import { v4 as uuidv4 } from "uuid";
import { TAuthData, TRegisterData } from "~entities/user/userSlice";
import { usersList } from "./user-mock";

export class UserMockManager {
  registeredUsers = usersList;

  constructor() {
    this.registeredUsers = usersList;
  }

  register(data: TRegisterData) {
    if (usersList.some((user) => user.login === data.login)) {
      throw new HttpResponse(null, { status: 403 });
    } else {
      const newUser = {
        ...data,
        id: uuidv4(),
      };

      usersList.push(newUser);

      return newUser;
    }
  }

  logIn(data: TAuthData) {
    if (usersList.some((user) => user.login === data.login)) {
      const user = usersList.find((user) => user.login === data.login);
      if (user && user.password === data.password) {
        const res = {
          content: {
            id: user.id,
            login: user.login,
            isAdmin: user.isAdmin,
          },
          token: `Bearer ${Math.floor(100000 + Math.random() * 900000)}`,
        };
        return res;
      } else {
        throw new HttpResponse(null, { status: 400 });
      }
    } else {
      throw new HttpResponse(null, {
        status: 404,
      });
    }
  }

  editUser(id: string, login: TAuthData["login"]) {
    const user = usersList.find((user) => user.id === id);
    if (user) {
      user.login = login;
    }

    return user?.login;
  }

  // getPassword(id: string) {
  //   return usersList.find((user) => user.id === id)?.password;
  // }
}

export const defaultUserMockManager = new UserMockManager();
