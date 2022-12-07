"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addSubscriptionValidator = exports.SubscriptionPurchaseValidator = void 0;
var _joi = _interopRequireDefault(require("joi"));
var SubscriptionPurchaseValidator = _joi["default"].object({
  subscriptionId: _joi["default"].string().required(),
  duration_id: _joi["default"].string().required()
});
exports.SubscriptionPurchaseValidator = SubscriptionPurchaseValidator;
var addSubscriptionValidator = _joi["default"].object({
  name: _joi["default"].string().required(),
  description: _joi["default"].string().required(),
  price: _joi["default"].number().required(),
  duration: _joi["default"].array().items(_joi["default"].object({
    month: _joi["default"].string().required()
  })).required()
});
exports.addSubscriptionValidator = addSubscriptionValidator;