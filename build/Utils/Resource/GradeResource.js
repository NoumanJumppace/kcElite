"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
// Create SubscriptionTypeResource class For Response
var GradeResource = /*#__PURE__*/(0, _createClass2["default"])(function GradeResource(Grades) {
  (0, _classCallCheck2["default"])(this, GradeResource);
  this.id = Grades._id;
  this.name = Grades.name;
  this.description = Grades.description;
});
var _default = GradeResource;
exports["default"] = _default;