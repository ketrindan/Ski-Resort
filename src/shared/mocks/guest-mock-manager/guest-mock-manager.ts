// import { HttpResponse } from "msw";
import { v4 as uuidv4 } from "uuid";
import { TCoach } from "~entities/coach/coachSlice";
import { TGuest } from "~entities/guest/guestSlice";
import { Skipass } from "~entities/skipass";
import { coaches } from "../coach-mock-manager/coach-mocks";
import { skipasses } from "../skipass-mock-manager/skipass-mock";
import { guests } from "./guest-mock";

export class guestsMockManager {
  private _guests: TGuest[];
  private _coaches: TCoach[];
  private _skipasses: Skipass[];

  constructor() {
    this._guests = guests;
    this._coaches = coaches;
    this._skipasses = skipasses;
  }

  updateGuests(data: TGuest[]) {
    this._guests = data;
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

  getGuest(id: string) {
    return this._guests.find((guest) => guest.id === id);
  }

  addGuest(data: TGuest) {
    const skipass = this._skipasses.find(
      (skipass) => skipass.id === data.skiPassId,
    );

    const newGuest: TGuest = {
      id: uuidv4(),
      name: data.name,
      surname: data.surname,
      birthDate: data.birthDate,
      skiPassId: data.skiPassId,
      skiPassCost: skipass?.cost,
      skiPassDuration: skipass?.duration,
      visitDate: data.visitDate,
    };

    skipass && skipass.agents?.push(newGuest);

    if (data.coachId) {
      const coach = this._coaches.find((coach) => coach.id === data.coachId);

      newGuest.coachId = data.coachId;
      newGuest.coachCategory = coach?.category;
      newGuest.coachNameSurname = `${coach?.name} ${coach?.surname}`;
      newGuest.coachSex = coach?.sex;

      coach && coach.guests?.push(newGuest);
    }

    this._guests.unshift(newGuest);

    return newGuest;
  }

  addSkipasstoGuest(guestId: string, skiPassId: string) {
    const guest = this._guests.find((guest) => guest.id === guestId) as TGuest;
    const skipass = this._skipasses.find((skipass) => skipass.id === skiPassId);

    if (guest && skipass) {
      guest.skiPassId = skipass.id;
      guest.skiPassCost = skipass.cost;
      guest.skiPassDuration = skipass.duration;

      skipass && skipass.agents?.push(guest);
    }

    return guest;
  }

  addCoachtoGuest(guestId: string, coachId: string) {
    const guest = this._guests.find((guest) => guest.id === guestId) as TGuest;
    const coach = this._coaches.find((coach) => coach.id === coachId);

    if (guest && coach) {
      guest.coachNameSurname = `${coach?.name} ${coach?.surname}`;
      guest.coachCategory = coach?.category;
      guest.coachSex = coach?.sex;
      coach.guests?.push(guest);
    }

    console.log(guest);

    return guest;
  }

  deleteGuest(id: string) {
    this.updateGuests(this._guests.filter((guest) => guest.id !== id));
    return this._guests.find((guest) => guest.id === id);
  }
}

export const defaultGuestsMockManager = new guestsMockManager();
