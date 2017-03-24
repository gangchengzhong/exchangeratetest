# Test Creating ExchangeRate APIs

## Problem:

Exchange Rate

Create a service that gives the latest and historical exchange rate for the currency.

Here are some examples of freely available data:

openexchangerates.org

## Solution:

Since we just need to get the latest and historical exchange rate for the currency data (json format), so I choose Nodejs+MongoDB.

### Model-View-Router (MVR) pattern

- Express: Build the REST APIs.
- Consign: Autoload models, routers, middlewares, configs, and more, as this module injects dependencies easily.
- Mongoose: Connect to the MongoDB

### Security

- Passport: Used as the authentication engine.
- Passport JWT: This is the JWT authentication strategy for Passport.
- JWT Simple: Used as encoder and decoder JSON tokens.
- bcrypt: Encryption of user passwords.
- CORS: Access control, limit which resources a client can gain access to from another domain.

### Logs

- winston: A multi-transport async logging library.
- morgan: HTTP request logger middleware.

### Test Scripts

- babel-register: To run ES6 codes.
- mocha: To run the tests.
- chai: To write BDD tests.
- supertest: To execute some requests in the API.

### API Documentation

- apidoc: Generate api documentation.