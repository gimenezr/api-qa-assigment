import { post, put, remove } from "../../utils/api.js";
import { newPost } from "../../dto/newPost.js";
import { newUser } from "../../dto/newUser.js";
import { expect } from "chai";
import { newComment } from "../../dto/newComment.js";
import { HTTP_STATUS_CODE } from "../../utils/httpConstants.js";

let createdUser;
let createdPost;

const createNewUser = async (userData) => {
  const createUserResponse = await post("/users").send(userData);
  return createUserResponse.body;
};

const createNewPost = async (newUserPost) => {
  const createPostResponse = await post(`/users/${createdUser.id}/posts`).send(
    newUserPost
  );
  return createPostResponse.body;
};

describe("Verify that the posts API returns correctly", () => {
  before("create a user", async () => {
    const user = newUser();
    const newUserPost = newPost();
    createdUser = await createNewUser(user);
    createdPost = await createNewPost(newUserPost);
  });

  it("should create a post", async () => {
    const newUserPost = newPost();

    const response = await post(`/users/${createdUser.id}/posts`)
      .send(newUserPost)
      .expect(HTTP_STATUS_CODE.CREATED);

    expect(response.body.id, "The expected id is not valid").be.greaterThan(
      0
    );
    expect(response.body.user_id).to.be.equal(createdUser.id);
    expect(response.body.title).to.be.equal(newUserPost.title);
    expect(response.body.body).to.be.equal(newUserPost.body);
  });

  it("should create a comment in a specific post", async () => {
    const newUserComment = newComment();
    const response = await post(`/posts/${createdPost.id}/comments`)
      .send(newUserComment)
      .expect(HTTP_STATUS_CODE.CREATED);

    expect(response.body.id, "The expected id is not valid").be.greaterThan(0);
    expect(response.body.post_id).to.be.equal(createdPost.id);
    expect(response.body.name).to.be.equal(newUserComment.name);
    expect(response.body.email).to.be.equal(newUserComment.email);
    expect(response.body.body).to.be.equal(newUserComment.body);
  });
});
