"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GradeValidator = void 0;
var _joi = _interopRequireDefault(require("joi"));
var GradeValidator = _joi["default"].object({
  name: _joi["default"].number().required()
  // description: joi.string().required(),
});
exports.GradeValidator = GradeValidator;