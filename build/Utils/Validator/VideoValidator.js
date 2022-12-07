"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateVideoValidator = void 0;
var _joi = _interopRequireDefault(require("joi"));
var CreateVideoValidator = _joi["default"].object({
  title: _joi["default"].string().required(),
  description: _joi["default"].string().required(),
  grade: _joi["default"].string().required(),
  category: _joi["default"].string().required()
});
exports.CreateVideoValidator = CreateVideoValidator;