import { faker } from "@faker-js/faker";

export const newPost = () => {
  return {
    title: faker.word.sample({ length: 15 }),
    body: faker.word.words({ count: { min: 10, max: 25 } })
  };
};
