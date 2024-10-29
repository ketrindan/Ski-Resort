import { TGuest } from "~entities/guest/guestSlice";

export type Skipass = {
  cost: number;
  duration: string;
  id: string;
  agent?: TGuest;
};
