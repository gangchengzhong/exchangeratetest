/**
 * Start the server using HTTPS
 */
const https = require("https");
const fs = require("fs");

module.exports = app => {
  if (process.env.NODE_ENV !== "test") {
    const credentials = {
      key: fs.readFileSync("localhost.key", "utf8"),
      cert: fs.readFileSync("localhost.cert", "utf8")
    };
	https.createServer(credentials, app)
        .listen(app.get("port"), () => {
            console.log(`Exchange Rate API - Port ${app.get("port")}`);
        });
  }
};