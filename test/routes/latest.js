/**
 * Test the Latest Endpoint
 */
const jwt = require("jwt-simple");

describe("Routes: Latest Exchange Rates", () => {
  const Users = app.models.users;
  const Rates = app.models.rates;
  const jwtSecret = config.jwtSecret;
  let token;
  let fakeRate;
  beforeEach(done => {
    Users
      .remove({})
      .then(() => Users.create({
        name: "John",
        email: "john@test.com",
        password: bcrypt.hashSync("12345", bcrypt.genSaltSync())
      }))
      .then(user => {
        Rates
          // TODO NEED TO GENERATE NEW DATA INSTEAD OF USING EXISTING ONE
          .findOne({timestamp : 1490086800})
          .then(rate => {
            fakeRate = rate;
            token = jwt.encode({id: user._id}, jwtSecret);
            done();
          });
      });
  });
  describe("GET /latest", () => {
    describe("status 200", () => {
      it("returns the latest exchange rates", done => {
        request.get("/latest")
          .set("Authorization", `JWT ${token}`)
          .expect(200)
          .end((err, res) => {
            expect(res.body.timestamp).to.eql(1490086800);
            expect(res.body.base).to.eql("USD");
            done(err);
          });
      });
    });
  });
});