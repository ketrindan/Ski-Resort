import { http, HttpResponse } from "msw";
import { TGuest } from "~entities/guest/guestSlice";
import { defaultMockManager } from "../mock-manager";

export const guestHandlers = [
  http.get("https://ski-resort/guest", async ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page"));
    const size = Number(url.searchParams.get("size"));

    return HttpResponse.json(defaultMockManager.fetchGuests(page, size));
  }),

  http.get("https://ski-resort/guest/:id", async ({ params }) => {
    const { id } = params;

    return HttpResponse.json(defaultMockManager.getGuest(id as string));
  }),

  http.post("https://ski-resort/guest", async ({ request }) => {
    const newGuestData = (await request.json()) as TGuest;

    return HttpResponse.json(defaultMockManager.addGuest(newGuestData));
  }),

  http.put(
    "https://ski-resort/guest/:guestId/coach/:coachId",
    async ({ params }) => {
      const { guestId, coachId } = params;

      return HttpResponse.json(
        defaultMockManager.addCoachtoGuest(
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
        defaultMockManager.addSkipasstoGuest(
          guestId as string,
          skiPassId as string,
        ),
      );
    },
  ),

  http.patch(
    "https://ski-resort/guest/edit/:guestId",
    async ({ request, params }) => {
      const newGuestData = (await request.json()) as TGuest;
      const { guestId } = params;

      return HttpResponse.json(
        defaultMockManager.editGuest(guestId as string, newGuestData),
      );
    },
  ),

  http.delete("https://ski-resort/guest/:id", async ({ params }) => {
    const { id } = params;

    return HttpResponse.json(defaultMockManager.deleteGuest(id as string));
  }),
];