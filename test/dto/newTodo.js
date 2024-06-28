import { faker } from "@faker-js/faker";

export const newTodo = () => {
    return {
        user: faker.person.lastName(),
        title: faker.internet.email({ provider: "dev.local" }).toLowerCase(),
        status: "pending",
        due_on: faker.date.anytime()
    };
}
