import { instance } from "./instance";

instance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ` + "token";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export { instance as axios };
