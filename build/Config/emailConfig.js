"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emailConfig = void 0;
var _dotenv = require("dotenv");
(0, _dotenv.config)();
var emailConfig = {
  pool: true,
  port: 465,
  secure: true,
  host: process.env.MAIL_HOST,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  }
};
exports.emailConfig = emailConfig;