/**
 * Test the Authentication Endpoint
 */
describe("Routes: Token", () => {
  const Users = app.models.users;
  describe("POST /token", () => {
    beforeEach(done => {
      Users
        .remove({})
        .then(() => Users.create({
          name: "John",
          email: "john@test.com",
          password: bcrypt.hashSync("12345", bcrypt.genSaltSync())
        }))
        .then(() => done());
    });
    describe("status 200", () => {
      it("returns authenticated user token", done => {
        request.post("/token")
          .send({
            email: "john@test.com",
            password: "12345"
          })
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.include.keys("token");
            done(err);
          });
      });
    });
    describe("status 401", () => {
      it("throws error when password is incorrect", done => {
        request.post("/token")
          .send({
            email: "john@test.com",
            password: "WRONG_PASSWORD"
          })
          .expect(401)
          .end((err, res) => {
            done(err);
          });
      });
      it("throws error when email does not exist", done => {
        request.post("/token")
          .send({
            email: "wrong@test.com",
            password: "12345"
          })
          .expect(401)
          .end((err, res) => {
            done(err);
          });
      });
      it("throws error when email and password are blank", done => {
        request.post("/token")
          .expect(401)
          .end((err, res) => {
            done(err);
          });
      });
    });
  });
});