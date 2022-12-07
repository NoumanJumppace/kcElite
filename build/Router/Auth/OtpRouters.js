"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OtpRouters = void 0;
var _express = require("express");
var _OtpController = require("../../Controller/OtpController.js");
var OtpRouters = (0, _express.Router)();

// Opt Routes
exports.OtpRouters = OtpRouters;
OtpRouters.route('/verify-otp').post(_OtpController.verifyOtp);
OtpRouters.route('/resend-otp/parent=:parent_id').get(_OtpController.resendOtp);