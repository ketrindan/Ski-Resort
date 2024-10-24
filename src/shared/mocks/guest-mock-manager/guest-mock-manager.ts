// import { HttpResponse } from "msw";
// import { v4 as uuidv4 } from "uuid";
import { TGuest } from "~entities/guest/guestSlice";
import { guests } from "./guest-mock";

export class guestsMockManager {
  private _guests: TGuest[];

  constructor() {
    this._guests = guests;
  }

  fetchGuests(page: number, size: number) {
    const data = this._guests?.slice(page * size, page * size + size);

    const result = {
      content: data,
      number: page,
      totalElements: this._guests.length,
      totalPages: Math.ceil(this._guests.length / size),
      size,
    };

    return result;
  }
}

export const defaultGuestsMockManager = new guestsMockManager();
