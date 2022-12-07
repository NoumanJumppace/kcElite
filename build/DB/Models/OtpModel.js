"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
// Create Otp Schema and Model

var OtpSchema = new _mongoose["default"].Schema({
  parent_id: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'parent',
    required: [true, 'Parent Id field is required']
  },
  otp: {
    type: String,
    required: [true, 'Otp field is required']
  },
  is_verified: {
    type: Boolean,
    "default": false
  },
  verfiy_at: {
    type: Date,
    "default": null
  }
}, {
  timestamps: true
});
var OtpModel = _mongoose["default"].model('otp', OtpSchema);
var _default = OtpModel;
exports["default"] = _default;