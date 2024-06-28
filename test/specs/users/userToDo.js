import { get, post, remove } from "../../utils/api.js";
import { newUser } from "../../dto/newUser.js";
import { expect } from "chai";
import { HTTP_STATUS_CODE } from "../../utils/httpConstants.js";
import { newTodo } from "../../dto/newTodo.js";

let createdUser;

const createNewUser = async (userData) => {
  const createUserResponse = await post("/users").send(userData);
  return createUserResponse.body;
};

describe("Verify that the todo API returns correctly", () => {
  before("create a user", async () => {
    const user = newUser();
    createdUser = await createNewUser(user);
  });

  it("should able to add a todo item", async () => {
    const toDoItem = newTodo();
    const response = await post(`/users/${createdUser.id}/todos`)
      .send(toDoItem)
      .expect(HTTP_STATUS_CODE.CREATED);

    expect(response.body.id, "The expected id is not valid").be.greaterThan(0);
    expect(response.body.user_id, "The expected name is nor valid").equal(
      createdUser.id
    );
    expect(response.body.title, "The expected email is nor valid").equal(
      toDoItem.title
    );
    expect(response.body.status, "The expected gender is nor valid").equal(
      toDoItem.status
    );
    expect(response.body.due_on, "The expected status is nor valid").to.not.be
      .null;
  });

  it("should remove the todo list when the user is deleted", async () => {
    await remove(`/users/${createdUser.id}`)
      .send()
      .expect(HTTP_STATUS_CODE.NO_CONTENT);

    const userResponse = await get(`/users/${createdUser.id}/todos`)
      .send()
      .expect(HTTP_STATUS_CODE.OK);
    expect(userResponse.body).to.be.an("array").that.is.empty;
  }).timeout(5000); //Sometimes this API takes longer to retrieve the user
});
