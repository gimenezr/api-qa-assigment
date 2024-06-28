import { faker } from "@faker-js/faker";

export const newComment = () => {
  return {
    body: faker.word.words({ count: { min: 10, max: 25 } }),
    name: faker.person.lastName(),
    email: faker.internet.email({ provider: "dev.local" }).toLowerCase()
  };
};
