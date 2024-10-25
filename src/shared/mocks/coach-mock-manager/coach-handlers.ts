import { http, HttpResponse } from "msw";
import { defaultCoachesMockManager } from "./coach-mock-manager";

export const coachHandlers = [
  http.get("https://ski-resort/coach", async ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page"));
    const size = Number(url.searchParams.get("size"));
    return HttpResponse.json(
      defaultCoachesMockManager.fetchCoaches(page, size),
    );
  }),

  http.delete("https://ski-resort/coach/:id", async ({ params }) => {
    const { id } = params;
    console.log(id);
    return HttpResponse.json(
      defaultCoachesMockManager.deleteCoach(id as string),
    );
  }),

  // http.post("https://ski-resort/login", async ({ request }) => {
  //   const data = (await request.json()) as TAuthData;
  //   return HttpResponse.json(defaultUserMockManager.logIn(data));
  // }),

  // http.patch("https://ski-resort/edit", async ({ request }) => {
  //   const data = (await request.json()) as Omit<TUserData, "isAdmin">;
  //   return HttpResponse.json(
  //     defaultUserMockManager.editUser(data?.id, data?.login),
  //   );
  // }),

  // http.get("https://ski-resort/password/:id", async ({ params }) => {
  //   const { id } = params;
  //   console.log(id);
  //   return HttpResponse.json(defaultUserMockManager.getPassword(id as string));
  // }),
];
