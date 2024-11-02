import { http, HttpResponse } from "msw";
import { TCoach } from "~entities/coach/coachSlice";
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

  http.post("https://ski-resort/coach", async ({ request }) => {
    const newCoachData = (await request.json()) as TCoach;
    return HttpResponse.json(defaultCoachesMockManager.addCoach(newCoachData));
  }),

  http.delete("https://ski-resort/coach/:id", async ({ params }) => {
    const { id } = params;
    console.log(id);
    return HttpResponse.json(
      defaultCoachesMockManager.deleteCoach(id as string),
    );
  }),

  http.put(
    "https://ski-resort/coach/:coachId/guest/:guestId",
    async ({ params }) => {
      const { guestId, coachId } = params;
      return HttpResponse.json(
        defaultCoachesMockManager.addGuestToCoach(
          guestId as string,
          coachId as string,
        ),
      );
    },
  ),

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
