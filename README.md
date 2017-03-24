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
- Secure Sockets Layer (SSL) connection via the HTTPS protocol
- helmet: Helps to secure Express apps by setting various HTTP headers.

### Performance

- cluster module.
- compression: compact the JSON responses and the entire API documentation static files into GZIP format.

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

### Setup

- Clone this repo: git clone git@github.com:gangchengzhong/exchangeratetest.git
- Access the folder: cd exchangeratetest
- Install dependencies: npm install
- Start your mongodb: mongod --dbpath "......" ......
- Create database "exchangerate" and collections "users" and "rates"
- Insert few test exchange rates documents (got examples from openexchangerates.org)
- Start the server: npm start
- Running tests: npm test
- Accessing API Status Page: https://localhost:3000
- Accessing Documentation: https://localhost:3000/apidoc

### TODO

- Thinking to build a simple SPA web or maybe use Angular, React... :)