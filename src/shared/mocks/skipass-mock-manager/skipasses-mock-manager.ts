// import { HttpResponse } from "msw";
import { v4 as uuidv4 } from "uuid";
import { TGuest } from "~entities/guest/guestSlice";
import { Skipass } from "~entities/skipass";
import { guests } from "../guest-mock-manager/guest-mock";
import { skipasses } from "./skipass-mock";

export class skipassesMockManager {
  private _skipasses: Skipass[];
  private _guests: TGuest[];

  constructor() {
    this._skipasses = skipasses;
    this._guests = guests;
  }

  updateSkipasses(data: Skipass[]) {
    this._skipasses = data;
  }

  fetchSkipasses(page: number, size: number) {
    const data = this._skipasses?.slice(page * size, page * size + size);

    const result = {
      content: data,
      number: page,
      totalElements: this._skipasses.length,
      totalPages: Math.ceil(this._skipasses.length / size),
      size,
    };

    return result;
  }

  addSkipass(data: Skipass) {
    const newSkipass: Skipass = {
      id: uuidv4(),
      cost: data.cost,
      duration: data.duration,
      agents: data.agents,
    };

    this._skipasses.unshift(newSkipass);

    return newSkipass;
  }

  addGuestToSkipass(guestId: string, skipassId: string) {
    const guest = this._guests.find((guest) => guest.id === guestId);
    const skipass = this._skipasses.find((skipass) => skipass.id === skipassId);

    if (guest && skipass) {
      skipass.agents.push(guest);
    }

    return skipass;
  }

  getSkipass(id: string) {
    return this._skipasses.find((skipass) => skipass.id === id);
  }

  deleteSkipass(id: string) {
    this.updateSkipasses(
      this._skipasses.filter((skipass) => skipass.id !== id),
    );
    return this._skipasses.find((skipass) => skipass.id === id);
  }
}

export const defaultSkipassesMockManager = new skipassesMockManager();
