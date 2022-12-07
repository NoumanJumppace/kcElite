"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var SubscriptionSchema = new _mongoose["default"].Schema({
  parent: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'parent'
  },
  subscriptionType: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'subscriptionTypes'
  },
  child: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'child'
  }],
  totalAmount: {
    type: Number,
    "default": 0
  },
  duration: {
    type: Number
  },
  expiryDate: {
    type: Date,
    "default": null
  },
  purchaseDate: {
    type: Date,
    "default": null
  },
  status: {
    type: Boolean,
    "default": true
  }
}, {
  timestamps: true
});
var SubscriptionModel = _mongoose["default"].model('subscription', SubscriptionSchema);
var _default = SubscriptionModel;
exports["default"] = _default;