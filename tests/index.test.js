const request = require("supertest");
const app = require("../index.js");

describe("GET /users", () => {
  it("should respond with list of users and 200 status", async () => {
    const response = await request(app)
      .get("/user_list")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.any(String),
          email: expect.any(String),
          role: expect.any(String),
        }),
      ])
    );
  });
});

describe("POST /users", () => {
  it("should create a new user", async () => {
    const response = await request(app)
      .post("/create_user")
      .send({
        name: "Pavan",
        email: "pavan@pavan.com",
        role: "User",
      })
      .expect("Content-Type", /json/)
      .expect(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: "Pavan",
        email: "pavan@pavan.com",
        role: "User",
      })
    );
  });
});

describe("PATCH /users", () => {
  it("should update an existing user", async () => {
    // Assumption: test will pass only if there is altest one user
    const getResponse = await request(app).get("/user_list");
    if (getResponse.body?.length > 0) {
      const user = getResponse.body[0];
      const response = await request(app)
        .patch("/update_user")
        .send({
          id: user?.id,
          name: user?.name,
        })
        .expect("Content-Type", /json/)
        .expect(200);
      expect(response.body.name).toEqual(user?.name);
    }
  });

  it("should return error when user does not exists", async () => {
    await request(app)
      .patch("/update_user")
      .send({
        id: 0,
        name: "Pavan",
      })
      .expect(404);
  });
});

describe("DELETE /users", () => {
  it("should delete an existing user", async () => {
    // Assumption: test will pass only if there is altest one user
    const getResponse = await request(app).get("/user_list");
    if (getResponse.body?.length > 0) {
      const user = getResponse.body[getResponse.body.length - 1];
      const response = await request(app)
        .delete("/delete_user")
        .send({
          userId: user?.id,
        })
        .expect(204);
    }
  });

  it("should return error when user does not exists", async () => {
    await request(app)
      .delete("/delete_user")
      .send({
        userId: 0,
      })
      .expect(404);
  });
});
