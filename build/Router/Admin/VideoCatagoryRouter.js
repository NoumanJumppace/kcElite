"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoCatagoryRouter = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _express = require("express");
var _VideoCatagoryController = _interopRequireDefault(require("../../Controller/Admin/VideoCatagoryController.js"));
// import GradeController from '../../Controller/Admin/GradeController.js'

// import { AuthMiddleware } from '../Middleware/Auth.js'

var VideoCatagoryRouter = (0, _express.Router)();

// application.prefix = Router.prefix = function (path, middleware, configure) {
//     configure(VideoCatagoryRouter);
//     this.use(path, middleware, VideoCatagoryRouter);
//     return VideoCatagoryRouter;
// }
exports.VideoCatagoryRouter = VideoCatagoryRouter;
_express.application.prefix = _express.Router.prefix = function (path, configure) {
  configure(VideoCatagoryRouter);
  this.use(path, VideoCatagoryRouter);
  return VideoCatagoryRouter;
};
VideoCatagoryRouter.prefix('/videocatagory', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          VideoCatagoryRouter.route('/get').get(_VideoCatagoryController["default"].getVideoCatagory);
          VideoCatagoryRouter.route('/create').post(_VideoCatagoryController["default"].addVideoCatagory);
          VideoCatagoryRouter.route('/update/:id').put(_VideoCatagoryController["default"].updateVideoCatagory);
        case 3:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));