import { faker } from "@faker-js/faker";

export const newUser = () => {
    return {
        name: faker.person.lastName(),
        email: faker.internet.email({ provider: "dev.local" }).toLowerCase(),
        gender: faker.person.sexType(),
        status: "active"
    };
}
