"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubscripRouter = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _express = require("express");
var _SubscripController = _interopRequireDefault(require("../../Controller/Admin/SubscripController.js"));
// import { AuthMiddleware } from '../Middleware/Auth.js'

var SubscripRouter = (0, _express.Router)();

// middleware,
// middleware,
exports.SubscripRouter = SubscripRouter;
_express.application.prefix = _express.Router.prefix = function (path, configure) {
  configure(SubscripRouter);
  this.use(path, SubscripRouter);
  return SubscripRouter;
};
SubscripRouter.prefix('/subscrip', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          SubscripRouter.route('/get').get(_SubscripController["default"].getSubscriptions);
          SubscripRouter.route('/add').post(_SubscripController["default"].addSubscription);
          SubscripRouter.route('/update/:id').put(_SubscripController["default"].updateSubscription);
        case 3:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));