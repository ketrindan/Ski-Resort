import axios from "axios";

export const instance = axios.create({
  baseURL: "https://ski-resort",
  headers: { "Content-Type": "application/json" },
});
