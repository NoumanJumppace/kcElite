"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _dotenv = require("dotenv");
(0, _dotenv.config)();
var SmSCongig = {
  Account_Sid: process.env.ACCOUNT_SID,
  Auth_Token: process.env.AUTH_TOKEN
};
var _default = SmSCongig;
exports["default"] = _default;