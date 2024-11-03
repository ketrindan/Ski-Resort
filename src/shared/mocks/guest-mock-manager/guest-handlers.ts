import { http, HttpResponse } from "msw";
import { TGuest } from "~entities/guest/guestSlice";
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
    return HttpResponse.json(defaultGuestsMockManager.getGuest(id as string));
  }),

  http.post("https://ski-resort/guest", async ({ request }) => {
    const newGuestData = (await request.json()) as TGuest;
    return HttpResponse.json(defaultGuestsMockManager.addGuest(newGuestData));
  }),

  http.put(
    "https://ski-resort/guest/:guestId/coach/:coachId",
    async ({ params }) => {
      const { guestId, coachId } = params;
      return HttpResponse.json(
        defaultGuestsMockManager.addCoachtoGuest(
          guestId as string,
          coachId as string,
        ),
      );
    },
  ),

  http.put(
    "https://ski-resort/guest/:guestId/skipass/:skiPassId",
    async ({ params }) => {
      const { guestId, skiPassId } = params;
      return HttpResponse.json(
        defaultGuestsMockManager.addSkipasstoGuest(
          guestId as string,
          skiPassId as string,
        ),
      );
    },
  ),

  http.delete("https://ski-resort/guest/:id", async ({ params }) => {
    const { id } = params;
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
