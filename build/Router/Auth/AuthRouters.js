"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthRouters = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _express = require("express");
var _AuthController = _interopRequireDefault(require("../../Controller/AuthController.js"));
var _Auth = require("../Middleware/Auth.js");
var AuthRouters = (0, _express.Router)();
exports.AuthRouters = AuthRouters;
AuthRouters.route('/register').post(_AuthController["default"].registerParents);
AuthRouters.route('/login').post(_AuthController["default"].Login);

// Forget Password APIs
AuthRouters.route('/forgetpassword').post(_AuthController["default"].ForgotPasswordOPT);
AuthRouters.route('/forgetpassword/verify').post(_AuthController["default"].VerifyPasswordOtp);
AuthRouters.route('/resetpassword').post(_AuthController["default"].ResetPassword);
_express.application.prefix = _express.Router.prefix = function (path, middleware, configure) {
  configure(AuthRouters);
  this.use(path, middleware, AuthRouters);
  return AuthRouters;
};
AuthRouters.prefix('/parents', _Auth.AuthMiddleware, /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          AuthRouters.route('/update/profile').post(_AuthController["default"].ParentsProfile);
        case 1:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));