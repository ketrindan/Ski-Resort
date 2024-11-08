import { http, HttpResponse } from "msw";
import { TCoach } from "~entities/coach/coachSlice";
import { defaultMockManager } from "../mock-manager";

export const coachHandlers = [
  http.get("https://ski-resort/coach", async ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page"));
    const size = Number(url.searchParams.get("size"));

    return HttpResponse.json(defaultMockManager.fetchCoaches(page, size));
  }),

  http.get("https://ski-resort/coach/all", async () => {
    return HttpResponse.json(defaultMockManager.fetchAllCoaches());
  }),

  http.post("https://ski-resort/coach", async ({ request }) => {
    const newCoachData = (await request.json()) as TCoach;

    return HttpResponse.json(defaultMockManager.addCoach(newCoachData));
  }),

  http.delete("https://ski-resort/coach/:id", async ({ params }) => {
    const { id } = params;

    return HttpResponse.json(defaultMockManager.deleteCoach(id as string));
  }),

  http.patch(
    "https://ski-resort/coach/edit/:coachId",
    async ({ params, request }) => {
      const { coachId } = params;
      const updatedCoachData = (await request.json()) as TCoach;

      return HttpResponse.json(
        defaultMockManager.editCoach(coachId as string, updatedCoachData),
      );
    },
  ),

  http.put(
    "https://ski-resort/coach/:coachId/guest/:guestId",
    async ({ params }) => {
      const { guestId, coachId } = params;

      return HttpResponse.json(
        defaultMockManager.addGuestToCoach(
          guestId as string,
          coachId as string,
        ),
      );
    },
  ),

  http.patch(
    "https://ski-resort/coach/:coachId/guest/:guestId",
    async ({ params }) => {
      const { guestId, coachId } = params;

      return HttpResponse.json(
        defaultMockManager.updateGuestToCoach(
          guestId as string,
          coachId as string,
        ),
      );
    },
  ),

  http.delete(
    "https://ski-resort/coach/:coachId/guest/:guestId",
    async ({ params }) => {
      const { guestId, coachId } = params;

      return HttpResponse.json(
        defaultMockManager.removeGuestFromCoach(
          guestId as string,
          coachId as string,
        ),
      );
    },
  ),
];
