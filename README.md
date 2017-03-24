# Test Creating ExchangeRate APIs

## Problem:

Exchange Rate

Create a service that gives the latest and historical exchange rate for the currency.

Here are some examples of freely available data:

openexchangerates.org

## Solution:

Since we just need to get the latest and historical exchange rate for the currency data (json format), so I choose Nodejs+MongoDB.

### Model-View-Router (MVR) pattern

- Express - Build the REST APIs.

npm install --save express<br/>
npm install --save babel-cli babel-preset-es2015

- Consign - Autoload models, routers, middlewares, configs, and more, as this module injects dependencies easily.

npm install --save consign

- Mongoose to connect to the MongoDB

npm install --save mongoose

- JSON parse

npm install --save body-parser

### Authenticating Users

- Passport: This will be used as the authentication engine.
- Passport JWT: This is the JWT authentication strategy for Passport.
- JWT Simple: This is used as encoder and decoder JSON tokens.

npm install --save passport passport-jwt jwt-simple

- Encryption of user passwords

npm install --save bcrypt


### Test

- babel-register: To run ES6 codes.
- mocha: To run the tests.
- chai: To write BDD tests.
- supertest: To execute some requests in the API.

npm install babel-register mocha chai supertest --save-dev
