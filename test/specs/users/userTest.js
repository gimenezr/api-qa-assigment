import { get, post, put, remove } from "../../utils/api.js";
import { newPost } from "../../dto/newPost.js";
import { newUser } from "../../dto/newUser.js";
import { expect } from "chai";
import { HTTP_STATUS_CODE } from "../../utils/httpConstants.js";

//agregar before(to create users) and after each(to remove the created users)
let createdUser;

const createNewUser = async (userData) => {
    const createUserResponse = await post("/users").send(userData);
    return createUserResponse.body;
}

describe("Verify that the Get and POST API returns correctly", () => {
  before("create a user", async () => {
    const user = newUser();
    createdUser = await createNewUser(user);
  });

  it("should get a list of users", async () => {
    const response = await get("/users").send().expect(200);
    //add assertion
  });

  it("should create a new user", async () => {
    const user = newUser();

    const response = await post("/users").send(user).expect(201);

    const createdUser = response.body;

    expect(createdUser.id, "The expected id is not valid").be.greaterThan(0);
    expect(createdUser.name, "The expected name is nor valid").equal(user.name);
    expect(createdUser.email, "The expected email is nor valid").equal(
      user.email
    );
    expect(createdUser.gender, "The expected gender is nor valid").equal(
      user.gender
    );
    expect(createdUser.status, "The expected status is nor valid").equal(
      user.status
    );
  });

  it("should not allow creating a user with an existing email", async () => {
    const response = await post("/users").send(createdUser).expect(422);

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
      .expect(200);

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
    
    await remove(`/users/${user.id}`).send().expect(HTTP_STATUS_CODE.NO_CONTENT);
    const response = await get(`/users/${user.id}`).send().expect(HTTP_STATUS_CODE.NOT_FOUND);
    
    expect(response.body.message).to.be.equal("Resource not found");
  }).timeout(3000); //Sometimes this API takes longer to retrieve the user
});
