import { TGuest } from "~entities/guest/guestSlice";

export type Skipass = {
  name: string;
  cost: number;
  duration: string;
  id?: string;
  agents: TGuest[];
};
