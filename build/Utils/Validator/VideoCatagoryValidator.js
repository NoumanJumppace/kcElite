"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoCatagoryValidator = void 0;
var _joi = _interopRequireDefault(require("joi"));
var VideoCatagoryValidator = _joi["default"].object({
  name: _joi["default"].string().required(),
  description: _joi["default"].string().required()
});
exports.VideoCatagoryValidator = VideoCatagoryValidator;