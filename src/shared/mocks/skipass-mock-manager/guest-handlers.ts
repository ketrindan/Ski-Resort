import { http, HttpResponse } from "msw";
import { Skipass } from "~entities/skipass";
import { defaultSkipassesMockManager } from "./skipasses-mock-manager";

export const skipassesHandlers = [
  http.get("https://ski-resort/skipass", async ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page"));
    const size = Number(url.searchParams.get("size"));
    return HttpResponse.json(
      defaultSkipassesMockManager.fetchSkipasses(page, size),
    );
  }),

  http.post("https://ski-resort/skipass", async ({ request }) => {
    const newSkipassData = (await request.json()) as Skipass;
    return HttpResponse.json(
      defaultSkipassesMockManager.addSkipass(newSkipassData),
    );
  }),

  http.get("https://ski-resort/skipass/:id", async ({ params }) => {
    const { id } = params;
    console.log(id);
    return HttpResponse.json(
      defaultSkipassesMockManager.getSkipass(id as string),
    );
  }),

  http.delete("https://ski-resort/skipass/:id", async ({ params }) => {
    const { id } = params;
    console.log(id);
    return HttpResponse.json(
      defaultSkipassesMockManager.deleteSkipass(id as string),
    );
  }),

  http.put(
    "https://ski-resort/skipass/:skipassId/guest/:guestId",
    async ({ params }) => {
      const { guestId, coachId } = params;
      return HttpResponse.json(
        defaultSkipassesMockManager.addGuestToSkipass(
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
];
