import { get, post, put, remove } from "../../utils/api.js";
import { newPost } from "../../dto/newPost.js";
import { newUser } from "../../dto/newUser.js";
import { expect } from "chai";

let createdUser;
let createdPost;

describe.skip("Verify that the Get and POST API returns correctly", () => {
  before("create a user", async () => {
    const user = newUser();
    const createUserResponse = await post("/users").send(user);
    createdUser = createUserResponse.body;
  });

  it("should create a post", async () => {
    const newUserPost = newPost();

    createdPost = await post(`/users/${createdUser.id}/posts`)
      .send(newUserPost)
      .expect(201);

    expect(createdPost.body.id, "The expected id is not valid").be.greaterThan(
      0
    );
    expect(createdPost.body.user_id).to.be.equal(createdUser.id);
    expect(createdPost.body.title).to.be.equal(newUserPost.title);
    expect(createdPost.body.body).to.be.equal(newUserPost.body);
  });

  it("should create a comment in a specific post", async () => {
    const newUserPost = newPost();

    const response = await post(`/posts/${createdPost.body.id}/comments`)
      .send(newUserPost)
      .expect(201);

    expect(response.body.id, "The expected id is not valid").be.greaterThan(0);
    expect(response.body.user_id).to.be.equal(createdUser.id);
    expect(response.body.title).to.be.equal(newUserPost.title);
    expect(response.body.body).to.be.equal(newUserPost.body);
  });

});
