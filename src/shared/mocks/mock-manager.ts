import { v4 as uuidv4 } from "uuid";
import { TCoach } from "~entities/coach/coachSlice";
import { TGuest } from "~entities/guest/guestSlice";
import { Skipass } from "~entities/skipass";
import { coaches } from "./coach-mock/coach-mock";
import { guests } from "./guest-mock/guest-mock";
import { skipasses } from "./skipass-mock/skipass-mock";

export class mockManager {
  coaches: TCoach[];
  guests: TGuest[];
  skipasses: Skipass[];

  constructor() {
    this.coaches = coaches;
    this.guests = guests;
    this.skipasses = skipasses;
  }

  // guests

  updateGuests(data: TGuest[]) {
    this.guests = data;
  }

  fetchAllGuests() {
    return this.guests;
  }

  fetchGuests(page: number, size: number) {
    const data = this.guests?.slice(page * size, page * size + size);

    const result = {
      content: data,
      number: page,
      totalElements: this.guests.length,
      totalPages: Math.ceil(this.guests.length / size),
      size,
    };

    return result;
  }

  getGuest(id: string) {
    return this.guests.find((guest) => guest.id === id);
  }

  addGuest(data: TGuest) {
    const skipass = this.skipasses.find(
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
    };

    if (data.coachId) {
      const coach = this.coaches.find((coach) => coach.id === data.coachId);

      newGuest.coachId = data.coachId;
      newGuest.coachCategory = coach?.category;
      newGuest.coachNameSurname = `${coach?.name} ${coach?.surname}`;
      newGuest.coachSex = coach?.sex;
    }

    this.guests.unshift(newGuest);

    return newGuest;
  }

  addSkipasstoGuest(guestId: string, skiPassId: string) {
    const guest = this.guests.find((guest) => guest.id === guestId) as TGuest;
    const skipass = this.skipasses.find((skipass) => skipass.id === skiPassId);

    if (guest && skipass) {
      guest.skiPassId = skipass.id;
      guest.skiPassCost = skipass.cost;
      guest.skiPassDuration = skipass.duration;
      skipass.agents.push(guest);
    }

    return guest;
  }

  addCoachtoGuest(guestId: string, coachId: string) {
    const guest = this.guests.find((guest) => guest.id === guestId) as TGuest;
    const coach = this.coaches.find((coach) => coach.id === coachId);

    if (guest && coach) {
      guest.coachNameSurname = `${coach?.name} ${coach?.surname}`;
      guest.coachCategory = coach?.category;
      guest.coachSex = coach?.sex;
      coach.guests.push(guest);
    }

    return guest;
  }

  removeCoachFromGuest(guestId: string) {
    const guest = this.guests.find((guest) => guest.id === guestId) as TGuest;

    if (guest) {
      guest.coachId = undefined;
      guest.coachNameSurname = undefined;
      guest.coachCategory = undefined;
      guest.coachSex = undefined;
    }

    return guest;
  }

  editGuest(guestId: string, data: TGuest) {
    const guest = this.guests.find((guest) => guest.id === guestId) as TGuest;
    const skipass = this.skipasses.find(
      (skipass) => skipass.id === data.skiPassId,
    );

    const updatedGuest: TGuest = {
      ...guest,
      ...data,
      skiPassCost: skipass?.cost,
      skiPassDuration: skipass?.duration,
    };

    if (data.coachId) {
      const coach = this.coaches.find((coach) => coach.id === data.coachId);

      updatedGuest.coachId = data.coachId;
      updatedGuest.coachCategory = coach?.category;
      updatedGuest.coachNameSurname = `${coach?.name} ${coach?.surname}`;
      updatedGuest.coachSex = coach?.sex;
    }

    this.guests = this.guests.map((guest) => {
      return guest.id === guestId ? updatedGuest : guest;
    });

    return updatedGuest;
  }

  deleteGuest(id: string) {
    this.updateGuests(this.guests.filter((guest) => guest.id !== id));
    return this.guests.find((guest) => guest.id === id);
  }

  // coaches

  updateСoaches(data: TCoach[]) {
    this.coaches = data;
  }

  fetchAllCoaches() {
    return this.coaches;
  }

  fetchCoaches(page: number, size: number) {
    const data = this.coaches?.slice(page * size, page * size + size);

    const result = {
      content: data,
      number: page,
      totalElements: this.coaches.length,
      totalPages: Math.ceil(this.coaches.length / size),
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

    this.coaches.unshift(newCoach);

    return newCoach;
  }

  addGuestToCoach(guestId: string, coachId: string) {
    const guest = this.guests.find((guest) => guest.id === guestId);
    const coach = this.coaches.find((coach) => coach.id === coachId);

    if (guest && coach) {
      coach.guests.push(guest);
    }

    return coach;
  }

  removeGuestFromCoach(guestId: string, coachId: string) {
    const guest = this.guests.find((guest) => guest.id === guestId);
    const coach = this.coaches.find((coach) => coach.id === coachId);

    if (guest && coach) {
      coach.guests = coach.guests.filter((guest) => guest.id !== guestId);
    }

    return coach;
  }

  updateGuestToCoach(guestId: string, coachId: string) {
    const updatedGuest = this.guests.find((guest) => guest.id === guestId);
    const coach = this.coaches.find((coach) => coach.id === coachId);

    if (updatedGuest && coach) {
      coach.guests = coach.guests.map((guest) => {
        return guest.id === updatedGuest.id ? updatedGuest : guest;
      });
    }

    return coach;
  }

  editCoach(coachId: string, data: TCoach) {
    const coach = this.coaches.find((coach) => coach.id === coachId);

    const updatedCoach: TCoach = {
      ...coach,
      ...data,
    };

    if (updatedCoach.guests.length > 0) {
      updatedCoach.guests.forEach((guest) => {
        guest.coachNameSurname = `${updatedCoach?.name} ${updatedCoach?.surname}`;
        guest.coachCategory = updatedCoach.category;
      });
    }

    this.coaches = this.coaches.map((coach) => {
      return coach.id === coachId ? updatedCoach : coach;
    });

    return updatedCoach;
  }

  deleteCoach(id: string) {
    this.updateСoaches(this.coaches.filter((coach) => coach.id !== id));
    return this.coaches.find((coach) => coach.id === id);
  }

  // skipasses

  updateSkipasses(data: Skipass[]) {
    this.skipasses = data;
  }

  fetchAllSkipasses() {
    return this.skipasses;
  }

  fetchSkipasses(page: number, size: number) {
    const data = this.skipasses?.slice(page * size, page * size + size);

    const result = {
      content: data,
      number: page,
      totalElements: this.skipasses.length,
      totalPages: Math.ceil(this.skipasses.length / size),
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

    this.skipasses.unshift(newSkipass);

    return newSkipass;
  }

  addGuestToSkipass(guestId: string, skipassId: string) {
    const guest = this.guests.find((guest) => guest.id === guestId);
    const skipass = this.skipasses.find((skipass) => skipass.id === skipassId);

    if (guest && skipass) {
      skipass.agents.push(guest);
    }

    return skipass;
  }

  removeGuestFromSkipass(guestId: string, skipassId: string) {
    const guest = this.guests.find((guest) => guest.id === guestId);
    const skipass = this.skipasses.find((skipass) => skipass.id === skipassId);

    if (guest && skipass) {
      skipass.agents = skipass.agents.filter((guest) => guest.id !== guestId);
    }

    return skipass;
  }

  updateGuestToSkipass(guestId: string, skipassId: string) {
    const updatedGuest = this.guests.find((guest) => guest.id === guestId);
    const skipass = this.skipasses.find((skipass) => skipass.id === skipassId);

    if (updatedGuest && skipass) {
      skipass.agents = skipass.agents.map((agent) => {
        return agent.id === updatedGuest.id ? updatedGuest : agent;
      });
    }

    return skipass;
  }

  getSkipass(id: string) {
    return this.skipasses.find((skipass) => skipass.id === id);
  }

  deleteSkipass(id: string) {
    this.updateSkipasses(this.skipasses.filter((skipass) => skipass.id !== id));
    return this.skipasses.find((skipass) => skipass.id === id);
  }
}

export const defaultMockManager = new mockManager();
