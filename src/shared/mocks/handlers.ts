import { coachHandlers } from "./coach-mock-manager/coach-handlers";
import { guestHandlers } from "./guest-mock-manager/guest-handlers";
import { userHandlers } from "./user-mock-manager/user-handlers";

export const handlers = [...userHandlers, ...guestHandlers, ...coachHandlers];
