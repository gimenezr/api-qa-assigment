import superTest from "supertest";
import ENV from "../utils/environment.js";

const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${ENV.ACCESS_TOKEN}`,
};

const setDefaultHeaders = (supertest) => {
  for (const [header, value] of Object.entries(defaultHeaders)) {
    supertest.set(header, value);
  }

  return supertest;
};

export const get = (path) => {
  const supertest = superTest(ENV.BASE_URL).get(path);
  return setDefaultHeaders(supertest);
};

export const post = (path) => {
  const supertest = superTest(ENV.BASE_URL).post(path);
  return setDefaultHeaders(supertest);
};

export const put = (path) => {
  const supertest = superTest(ENV.BASE_URL).put(path);
  return setDefaultHeaders(supertest);
};

export const remove = (path) => {
  const supertest = superTest(ENV.BASE_URL).delete(path);
  return setDefaultHeaders(supertest);
};
