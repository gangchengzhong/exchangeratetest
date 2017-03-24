/**
 * Test the Historical Endpoint
 */
const jwt = require("jwt-simple");

describe("Routes: Historical Exchange Rates", () => {
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
          .findOne({timestamp : 1490054399})
          .then(rate => {
            fakeRate = rate;
            token = jwt.encode({id: user._id}, jwtSecret);
            done();
          });
      });
  });
  describe("GET /historical/:date", () => {
    describe("status 200", () => {
      it("returns the historical exchange rates", done => {
        request.get("/historical/2017-03-24")
          .set("Authorization", `JWT ${token}`)
          .expect(200)
          .end((err, res) => {
            expect(res.body.timestamp).to.eql(1490054399);
            expect(res.body.base).to.eql("USD");
            done(err);
          });
      });
    });
    describe("status 404", () => {
      it("throws error when the historical exchange rates does not exist", done => {
        request.get("/historical/2016-03-24")
          .set("Authorization", `JWT ${token}`)
          //.expect(404)
          .end((err, res) => done(err));
      });
    });
  });
});