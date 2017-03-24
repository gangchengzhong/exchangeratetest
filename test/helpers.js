/**
 * Mocha-specific settings to load the API server and
 * the modules chai and supertest as global variables.
 * This will accelerate the execution of tests.
 */
const supertest = require("supertest");
const chai = require("chai");
const app = require("../index.js");
const bcrypt = require("bcrypt");
const config = require("../libs/config.js");

global.app = app;
global.request = supertest(app);
global.expect = chai.expect;
global.bcrypt = bcrypt;
global.config = config;