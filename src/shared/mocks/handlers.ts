import { coachHandlers } from "./coach-mock/coach-handlers";
import { guestHandlers } from "./guest-mock/guest-handlers";
import { skipassesHandlers } from "./skipass-mock/skipass-handlers";
import { userHandlers } from "./user-mock-manager/user-handlers";

export const handlers = [
  ...userHandlers,
  ...guestHandlers,
  ...coachHandlers,
  ...skipassesHandlers,
];
