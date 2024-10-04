import { axios } from "./instance";

axios.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ` + "token";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export { axios };
