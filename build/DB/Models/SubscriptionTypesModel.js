"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var SubscriptionTypesSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: [true, 'name field is required']
  },
  description: {
    type: String,
    required: [true, 'description field is required']
  },
  price: {
    type: Number,
    required: [true, 'price field is required']
  },
  duration: [{
    month: {
      type: Number
    }
  }]
}, {
  timestamps: true
});
var SubscriptionTypesModel = _mongoose["default"].model('subscriptionTypes', SubscriptionTypesSchema);
var _default = SubscriptionTypesModel;
exports["default"] = _default;