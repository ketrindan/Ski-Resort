// import { HttpResponse } from "msw";
// import { v4 as uuidv4 } from "uuid";
import { Skipass } from "~entities/skipass";
import { skipasses } from "./skipass-mock";

export class skipassesMockManager {
  private _skipasses: Skipass[];

  constructor() {
    this._skipasses = skipasses;
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
