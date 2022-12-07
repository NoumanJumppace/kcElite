"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
// Create Otp Schema and Model

var ForgetPasswordSchema = new _mongoose["default"].Schema({
  // Child Or Parent
  type: {
    type: String,
    "enum": ['parent', 'child']
  },
  // User Id
  user_id: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    "default": null
  },
  forgetOtp: {
    type: String,
    required: [true, 'forgetOtp field is required']
  },
  is_used: {
    type: Boolean,
    "default": false
  },
  used_at: {
    type: Date,
    "default": null
  }
}, {
  timestamps: true
});
var ForgetPasswordModel = _mongoose["default"].model('forgetPassword', ForgetPasswordSchema);
var _default = ForgetPasswordModel;
exports["default"] = _default;