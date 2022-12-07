"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubscriptionRouter = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _express = require("express");
var _SubscriptionController = _interopRequireDefault(require("../../Controller/SubscriptionController.js"));
var _Auth = require("../Middleware/Auth.js");
var SubscriptionRouter = (0, _express.Router)();
exports.SubscriptionRouter = SubscriptionRouter;
_express.application.prefix = _express.Router.prefix = function (path, middleware, configure) {
  configure(SubscriptionRouter);
  this.use(path, middleware, SubscriptionRouter);
  return SubscriptionRouter;
};
SubscriptionRouter.prefix('/subscription', _Auth.AuthMiddleware, /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          SubscriptionRouter.get('/types', _SubscriptionController["default"].getAllSubscriptionsType);
          SubscriptionRouter.post('/buy', _SubscriptionController["default"].buySubscription);
          SubscriptionRouter.get('/current', _SubscriptionController["default"].getCurrentUserSubscription);
        case 3:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));