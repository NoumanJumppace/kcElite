"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var gradeSchema = new _mongoose["default"].Schema({
  name: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    "default": null
  }
}, {
  timestamps: true
});
var GradeModel = _mongoose["default"].model('grade', gradeSchema);
var _default = GradeModel;
exports["default"] = _default;