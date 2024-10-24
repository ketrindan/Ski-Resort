// import { HttpResponse } from "msw";
// import { v4 as uuidv4 } from "uuid";
import { TCoach } from "~entities/coach/coachSlice";
import { coaches } from "./coach-mocks";

export class coachesMockManager {
  private _coaches: TCoach[];

  constructor() {
    this._coaches = coaches;
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
}

export const defaultCoachesMockManager = new coachesMockManager();
