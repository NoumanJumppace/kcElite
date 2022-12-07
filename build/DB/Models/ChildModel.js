"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var ChildSchema = new _mongoose["default"].Schema({
  fullName: {
    type: String,
    "default": null
  },
  profilePicture: {
    type: String,
    "default": null
  },
  grade: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'grade',
    "default": null
  },
  birthdate: {
    type: String,
    "default": null
  },
  tier: {
    type: String,
    "default": null
  },
  parent: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'parent'
  },
  deviceToken: {
    type: String,
    "default": null
  },
  macAddress: {
    type: String,
    "default": null
  },
  type: {
    type: Boolean,
    "default": false
  },
  email: {
    type: String
  },
  password: {
    type: String
  }
}, {
  timestamps: true
});
var ChildModel = _mongoose["default"].model('child', ChildSchema);
var _default = ChildModel;
exports["default"] = _default;