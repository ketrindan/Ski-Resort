import { http, HttpResponse } from "msw";
import { TAuthData } from "~entities/user/userSlice";
import { defaultUserMockManager } from "./user-mock-manager/user-mock-manager";

export const handlers = [
  http.post("https://ski-resort/login", async ({ request }) => {
    const data = (await request.json()) as TAuthData;
    return HttpResponse.json(defaultUserMockManager.logIn(data));
  }),
];
