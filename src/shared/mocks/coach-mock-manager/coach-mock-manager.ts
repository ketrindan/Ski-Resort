// import { HttpResponse } from "msw";
import { v4 as uuidv4 } from "uuid";
import { TCoach } from "~entities/coach/coachSlice";
import { TGuest } from "~entities/guest/guestSlice";
import { guests } from "../guest-mock-manager/guest-mock";
import { coaches } from "./coach-mocks";

export class coachesMockManager {
  private _coaches: TCoach[];
  private _guests: TGuest[];

  constructor() {
    this._coaches = coaches;
    this._guests = guests;
  }

  updateGuests(data: TCoach[]) {
    this._coaches = data;
  }

  fetchCoaches(page: number, size: number) {
    const data = this._coaches?.slice(page * size, page * size + size);

    const result = {
      content: data,
      number: page,
      totalElements: this._coaches.length,
      totalPages: Math.ceil(this._coaches.length / size),
      size,
    };

    return result;
  }

  addCoach(data: TCoach) {
    const newCoach: TCoach = {
      id: uuidv4(),
      name: data.name,
      surname: data.surname,
      birthDate: data.birthDate,
      category: data.category,
      sex: data.sex,
      guests: data.guests,
    };

    this._coaches.unshift(newCoach);

    return newCoach;
  }

  addGuestToCoach(guestId: string, coachId: string) {
    const guest = this._guests.find((guest) => guest.id === guestId);
    const coach = this._coaches.find((coach) => coach.id === coachId);

    if (guest && coach) {
      coach.guests.push(guest);
    }

    return coach;
  }

  deleteCoach(id: string) {
    this.updateGuests(this._coaches.filter((coach) => coach.id !== id));
    return this._coaches.find((coach) => coach.id === id);
  }
}

export const defaultCoachesMockManager = new coachesMockManager();
