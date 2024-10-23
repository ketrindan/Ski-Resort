import { http, HttpResponse } from "msw";
import { TAuthData, TUserData, TRegisterData } from "~entities/user/userSlice";
import { defaultUserMockManager } from "./user-mock-manager";

export const userHandlers = [
  http.post("https://ski-resort/register", async ({ request }) => {
    const data = (await request.json()) as TRegisterData;
    return HttpResponse.json(defaultUserMockManager.register(data));
  }),

  http.post("https://ski-resort/login", async ({ request }) => {
    const data = (await request.json()) as TAuthData;
    return HttpResponse.json(defaultUserMockManager.logIn(data));
  }),

  http.patch("https://ski-resort/edit", async ({ request }) => {
    const data = (await request.json()) as Omit<TUserData, "isAdmin">;
    return HttpResponse.json(
      defaultUserMockManager.editUser(data?.id, data?.login),
    );
  }),

  // http.get("https://ski-resort/password/:id", async ({ params }) => {
  //   const { id } = params;
  //   console.log(id);
  //   return HttpResponse.json(defaultUserMockManager.getPassword(id as string));
  // }),
];
