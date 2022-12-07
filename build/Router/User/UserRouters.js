"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserRouters = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _express = require("express");
var _GradeController = _interopRequireDefault(require("../../Controller/Admin/GradeController.js"));
var _AuthController = _interopRequireDefault(require("../../Controller/AuthController.js"));
var _Auth = require("../Middleware/Auth.js");
var UserRouters = (0, _express.Router)();
exports.UserRouters = UserRouters;
UserRouters.route('/grade/get').get(_GradeController["default"].getGrades);
_express.application.prefix = _express.Router.prefix = function (path, middleware, configure) {
  configure(UserRouters);
  this.use(path, middleware, UserRouters);
  return UserRouters;
};
UserRouters.prefix('/parents', _Auth.AuthMiddleware, /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          UserRouters.route('/update/profile').post(_AuthController["default"].ParentsProfile);
        case 1:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));