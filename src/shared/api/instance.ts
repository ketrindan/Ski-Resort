import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.236.16:9999",
  headers: { "Content-Type": "application/json" },
});

export { instance as axios };
