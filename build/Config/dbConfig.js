"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _dotenv = require("dotenv");
(0, _dotenv.config)();
var dbConfig = {
  // MongoDB connection string
  db: process.env.MONGO_URI
};
var _default = dbConfig;
exports["default"] = _default;