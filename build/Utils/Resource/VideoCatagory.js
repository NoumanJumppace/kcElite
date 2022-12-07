"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
// Create SubscriptionTypeResource class For Response
var VideoCatagoryResource = /*#__PURE__*/(0, _createClass2["default"])(function VideoCatagoryResource(VideoCatagory) {
  (0, _classCallCheck2["default"])(this, VideoCatagoryResource);
  this.id = VideoCatagory._id;
  this.name = VideoCatagory.name;
  this.description = VideoCatagory.description;
});
var _default = VideoCatagoryResource;
exports["default"] = _default;