import { http, HttpResponse } from "msw";
import { defaultGuestsMockManager } from "./guest-mock-manager";

export const guestHandlers = [
  http.get("https://ski-resort/guest", async ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page"));
    const size = Number(url.searchParams.get("size"));
    return HttpResponse.json(defaultGuestsMockManager.fetchGuests(page, size));
  }),

  http.get("https://ski-resort/guest/:id", async ({ params }) => {
    const { id } = params;
    console.log(id);
    return HttpResponse.json(defaultGuestsMockManager.getGuest(id as string));
  }),

  http.delete("https://ski-resort/guest/:id", async ({ params }) => {
    const { id } = params;
    console.log(id);
    return HttpResponse.json(
      defaultGuestsMockManager.deleteGuest(id as string),
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
];
