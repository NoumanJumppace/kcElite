"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoRouter = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _express = require("express");
var _VideoController = _interopRequireDefault(require("../../Controller/Admin/VideoController.js"));
// import GradeController from '../../Controller/Admin/GradeController.js'
// import VideoCatagoryController from '../../Controller/Admin/VideoCatagoryController.js'

// import { AuthMiddleware } from '../Middleware/Auth.js'

var VideoRouter = (0, _express.Router)();

// application.prefix = Router.prefix = function (path, middleware, configure) {
//     configure(VideoRouter);
//     this.use(path, middleware, VideoRouter);
//     return VideoRouter;
// }
exports.VideoRouter = VideoRouter;
_express.application.prefix = _express.Router.prefix = function (path, configure) {
  configure(VideoRouter);
  this.use(path, VideoRouter);
  return VideoRouter;
};
VideoRouter.prefix('/video', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // VideoRouter.route("/get").get(VideoCatagoryController.getVideoCatagory);
          VideoRouter.route('/create').post(_VideoController["default"].AddVideo);
          // VideoRouter.route("/update/:id").put(VideoCatagoryController.updateVideoCatagory);
        case 1:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));