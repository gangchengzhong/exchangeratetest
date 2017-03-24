/**
 * Test the Users Endpoint
 */
const jwt = require("jwt-simple");

describe("Routes: Users", () => {
  const Users = app.models.users;
  const jwtSecret = config.jwtSecret;
  let token;
  beforeEach(done => {
    Users
      .remove({})
      .then(() => Users.create({
        name: "John",
        email: "john@test.com",
        password: bcrypt.hashSync("12345", bcrypt.genSaltSync())
      }))
      .then(user => {
        token = jwt.encode({id: user._id}, jwtSecret);
        done();
      });
  });
  describe("GET /user", () => {
    describe("status 200", () => {
      it("returns an authenticated user", done => {
        request.get("/user")
          .set("Authorization", `JWT ${token}`)
          .expect(200)
          .end((err, res) => {
            expect(res.body.name).to.eql("John");
            expect(res.body.email).to.eql("john@test.com");
            done(err);
          });
      });
    });
  });
  describe("DELETE /user", () => {
    describe("status 204", () => {
      it("deletes an authenticated user", done => {
        request.delete("/user")
          .set("Authorization", `JWT ${token}`)
          .expect(204)
          .end((err, res) => done(err));
      });
    });
  });
  describe("POST /users", () => {
    describe("status 200", () => {
      it("creates a new user", done => {
        request.post("/users")
          .send({
            name: "Joe",
            email: "joe@test.com",
            password: "12345"
          })
          .expect(200)
          .end((err, res) => {
            expect(res.body.name).to.eql("Joe");
            expect(res.body.email).to.eql("joe@test.com");
            done(err);
          });
      });
    });
  });
});