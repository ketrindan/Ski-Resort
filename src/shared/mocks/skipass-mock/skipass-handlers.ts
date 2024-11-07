import { http, HttpResponse } from "msw";
import { Skipass } from "~entities/skipass";
import { defaultMockManager } from "../mock-manager";

export const skipassesHandlers = [
  http.get("https://ski-resort/skipass/all", async () => {
    return HttpResponse.json(defaultMockManager.fetchAllSkipasses());
  }),

  http.get("https://ski-resort/skipass", async ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page"));
    const size = Number(url.searchParams.get("size"));

    return HttpResponse.json(defaultMockManager.fetchSkipasses(page, size));
  }),

  http.post("https://ski-resort/skipass", async ({ request }) => {
    const newSkipassData = (await request.json()) as Skipass;

    return HttpResponse.json(defaultMockManager.addSkipass(newSkipassData));
  }),

  http.get("https://ski-resort/skipass/:id", async ({ params }) => {
    const { id } = params;

    return HttpResponse.json(defaultMockManager.getSkipass(id as string));
  }),

  http.delete("https://ski-resort/skipass/:id", async ({ params }) => {
    const { id } = params;

    return HttpResponse.json(defaultMockManager.deleteSkipass(id as string));
  }),

  http.put(
    "https://ski-resort/skipass/:skipassId/guest/:guestId",
    async ({ params }) => {
      const { guestId, skipassId } = params;

      return HttpResponse.json(
        defaultMockManager.addGuestToSkipass(
          guestId as string,
          skipassId as string,
        ),
      );
    },
  ),

  http.patch(
    "https://ski-resort/skipass/:skipassId/guest/:guestId",
    async ({ params }) => {
      const { guestId, skipassId } = params;

      return HttpResponse.json(
        defaultMockManager.updateGuestToSkipass(
          guestId as string,
          skipassId as string,
        ),
      );
    },
  ),

  http.delete(
    "https://ski-resort/skipass/:skipassId/guest/:guestId",
    async ({ params }) => {
      const { guestId, skipassId } = params;

      return HttpResponse.json(
        defaultMockManager.removeGuestFromSkipass(
          guestId as string,
          skipassId as string,
        ),
      );
    },
  ),
];
