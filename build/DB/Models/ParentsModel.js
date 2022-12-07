"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var ParentSchema = new _mongoose["default"].Schema({
  fullName: {
    type: String,
    "default": null
  },
  address: {
    type: String,
    "default": null
  },
  city: {
    type: String,
    "default": null
  },
  state: {
    type: String,
    "default": null
  },
  profilePicture: {
    type: String,
    "default": null
  },
  phone: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  deviceToken: {
    type: String,
    "default": null
  },
  macAddress: {
    type: String,
    "default": null
  },
  subscription: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'subscription',
    "default": null
  }],
  type: {
    type: Boolean,
    "default": true
  },
  child: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'child'
  }]
}, {
  timestamps: true
});
var ParentsModel = _mongoose["default"].model('parent', ParentSchema);
var _default = ParentsModel;
exports["default"] = _default;