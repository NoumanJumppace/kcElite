"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResetPasswordValidator = exports.ResetPasswordOTPValidator = exports.RegisterValidator = exports.LoginValidator = exports.ForgotPasswordValidator = exports.AfterSignupValidator = void 0;
var _joi = _interopRequireDefault(require("joi"));
var LoginValidator = _joi["default"].object({
  email: _joi["default"].string().required(),
  password: _joi["default"].string().min(6).required()
});
exports.LoginValidator = LoginValidator;
var RegisterValidator = _joi["default"].object({
  phone: _joi["default"].string().required(),
  email: _joi["default"].string().email().required(),
  password: _joi["default"].string().required(),
  confirmPassword: _joi["default"].string().required()
  // deviceToken: joi.string().required(),
});
exports.RegisterValidator = RegisterValidator;
var AfterSignupValidator = _joi["default"].object({
  id: _joi["default"].string().required(),
  fullName: _joi["default"].string().required(),
  address: _joi["default"].string().required(),
  city: _joi["default"].string().required(),
  state: _joi["default"].string().required(),
  childname: _joi["default"].string().required(),
  childgrade: _joi["default"].string().required(),
  childbirthdate: _joi["default"].string().required()
  // profilePicture: joi.required(),
});
exports.AfterSignupValidator = AfterSignupValidator;
var ForgotPasswordValidator = _joi["default"].object({
  email: _joi["default"].string().required()
});
exports.ForgotPasswordValidator = ForgotPasswordValidator;
var ResetPasswordOTPValidator = _joi["default"].object({
  user_id: _joi["default"].string().required(),
  otp: _joi["default"].string().required()
});
exports.ResetPasswordOTPValidator = ResetPasswordOTPValidator;
var ResetPasswordValidator = _joi["default"].object({
  user_id: _joi["default"].string().required(),
  password: _joi["default"].string().required(),
  confirmPassword: _joi["default"].string().required()
});
exports.ResetPasswordValidator = ResetPasswordValidator;