"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _VideoModel = _interopRequireDefault(require("../../DB/Models/VideoModel.js"));
var _CustomError = _interopRequireDefault(require("../../Utils/ResponseHandler/CustomError.js"));
var _CustomSuccess = _interopRequireDefault(require("../../Utils/ResponseHandler/CustomSuccess.js"));
var _VideoValidator = require("../../Utils/Validator/VideoValidator.js");
var _MultipartData = require("../../Utils/MultipartData.js");
var _VideoResource = _interopRequireDefault(require("../../Utils/Resource/VideoResource.js"));
// DB / Model

// Utils (Response, Error, Logger)

var AddVideo = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var _CreateVideoValidator, error, _req$body, title, description, grade, category, _req$files, video, thumbnail, video_url, thumbnail_url, VideoCreate, VideoRes;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _CreateVideoValidator = _VideoValidator.CreateVideoValidator.validate(req.body), error = _CreateVideoValidator.error;
            if (!error) {
              _context.next = 4;
              break;
            }
            return _context.abrupt("return", next(_CustomError["default"].createError(error.message, 200)));
          case 4:
            _req$body = req.body, title = _req$body.title, description = _req$body.description, grade = _req$body.grade, category = _req$body.category;
            _req$files = req.files, video = _req$files.video, thumbnail = _req$files.thumbnail;
            video_url = video[0].path;
            thumbnail_url = thumbnail[0].path;
            _context.next = 10;
            return _VideoModel["default"].create({
              title: title,
              description: description,
              grade: grade,
              category: category,
              video_url: video_url,
              thumbnail_url: thumbnail_url
            });
          case 10:
            VideoCreate = _context.sent;
            console.log(VideoCreate);
            VideoRes = new _VideoResource["default"](VideoCreate);
            return _context.abrupt("return", next(_CustomSuccess["default"].createSuccess(VideoRes, 'Video Added Successfully', 200)));
          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0);
          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 16]]);
  }));
  return function AddVideo(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var VideoController = {
  AddVideo: [_MultipartData.handleMultipartDataVideo.fields([{
    name: 'video',
    maxCount: 1
  }, {
    name: 'thumbnail',
    maxCount: 1
  }]), AddVideo]
};
var _default = VideoController;
exports["default"] = _default;