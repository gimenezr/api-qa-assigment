import { get, post, put, remove } from "../../utils/api.js";
import { newUser } from "../../dto/newUser.js";
import { expect } from "chai";
import { HTTP_STATUS_CODE } from "../../utils/httpConstants.js";

let createdUser;

const createNewUser = async (userData) => {
  const createUserResponse = await post("/users").send(userData);
  return createUserResponse.body;
};

describe("Verify that the users API returns correctly", () => {
  before("create a user", async () => {
    const user = newUser();
    createdUser = await createNewUser(user);
  });

  it("should get a list of users", async () => {
    const response = await get("/users").send().expect(HTTP_STATUS_CODE.OK);
    expect(response.body).to.be.an("array");
  });

  it("should create a new user", async () => {
    const user = newUser();
    const response = await post("/users").send(user).expect(HTTP_STATUS_CODE.CREATED);

    expect(response.body.id, "The expected id is not valid").be.greaterThan(0);
    expect(response.body.name, "The expected name is nor valid").equal(user.name);
    expect(response.body.email, "The expected email is nor valid").equal(
      user.email
    );
    expect(response.body.gender, "The expected gender is nor valid").equal(
      user.gender
    );
    expect(response.body.status, "The expected status is nor valid").equal(
      user.status
    );
  });

  it("should not allow creating a user with an existing email", async () => {
    const response = await post("/users").send(createdUser).expect(HTTP_STATUS_CODE.UNPROCESSABLE_ENTITY);
    expect(response.body[0].field, "It's not the expected field").equal(
      "email"
    );
    expect(
      response.body[0].message,
      "The expected message is not correct"
    ).equal("has already been taken");
  });

  it("should update a user", async () => {
    const userDataChanged = newUser();

    const response = await put(`/users/${createdUser.id}`)
      .send(userDataChanged)
      .expect(HTTP_STATUS_CODE.OK);

    expect(createdUser.id, "The expected id is not valid").to.equal(
      response.body.id
    );
    expect(userDataChanged.name, "The name wasn't updated").to.equal(
      response.body.name
    );

    expect(userDataChanged.email, "The email wasn't updated").to.equal(
      response.body.email
    );

    expect(userDataChanged.gender, "The gender gender is nor valid").to.equal(
      response.body.gender
    );
    expect(userDataChanged.status, "The status status is nor valid").to.equal(
      response.body.status
    );
  });

  it("should remove a user", async () => {
    const user = await createNewUser(newUser());

    await remove(`/users/${user.id}`)
      .send()
      .expect(HTTP_STATUS_CODE.NO_CONTENT);
    const response = await get(`/users/${user.id}`)
      .send()
      .expect(HTTP_STATUS_CODE.NOT_FOUND);

    expect(response.body.message).to.be.equal("Resource not found");
  }).timeout(5000); //Sometimes this API takes longer to retrieve the user
});
