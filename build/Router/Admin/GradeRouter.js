"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GradeRouter = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _express = require("express");
var _GradeController = _interopRequireDefault(require("../../Controller/Admin/GradeController.js"));
// import { AuthMiddleware } from '../Middleware/Auth.js'

var GradeRouter = (0, _express.Router)();

// application.prefix = Router.prefix = function (path, middleware, configure) {
//     configure(GradeRouter);
//     this.use(path, middleware, GradeRouter);
//     return GradeRouter;
// }
exports.GradeRouter = GradeRouter;
_express.application.prefix = _express.Router.prefix = function (path, configure) {
  configure(GradeRouter);
  this.use(path, GradeRouter);
  return GradeRouter;
};
GradeRouter.prefix('/grade', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          GradeRouter.route('/get').get(_GradeController["default"].getGrades);
          GradeRouter.route('/create').post(_GradeController["default"].addGrade);
          GradeRouter.route('/update/:id').put(_GradeController["default"].updateGrade);
        case 3:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));