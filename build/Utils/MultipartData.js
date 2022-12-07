"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleMultipartDataVideo = exports.handleMultipartData = exports.Storage = void 0;
var _multer = _interopRequireDefault(require("multer"));
var _path = _interopRequireDefault(require("path"));
var Storage = _multer["default"].diskStorage({
  destination: function destination(req, file, callback) {
    callback(null, _path["default"].join('src', 'Uploads'));
  },
  filename: function filename(req, file, callback) {
    var fileName = file.originalname.split(' ').join('-');
    var extension = _path["default"].extname(fileName);
    var baseName = _path["default"].basename(fileName, extension);
    callback(null, baseName + '-' + Date.now() + extension);
  }
});
exports.Storage = Storage;
var handleMultipartData = (0, _multer["default"])({
  storage: Storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: function fileFilter(req, file, callback) {
    var FileTypes = /jpeg|jpg|png|gif/;
    var mimType = FileTypes.test(file.mimetype);
    var extname = FileTypes.test(_path["default"].extname(file.originalname));
    if (mimType && extname) {
      return callback(null, true);
    }
    callback(new Error('File type not supported'));
  }
});
exports.handleMultipartData = handleMultipartData;
var handleMultipartDataVideo = (0, _multer["default"])({
  storage: Storage,
  limits: {
    fileSize: 1024 * 1024 * 50
  },
  fileFilter: function fileFilter(req, file, callback) {
    var FileTypes = /mp4|avi|mkv|jpeg|jpg|png|gif/;
    var mimType = FileTypes.test(file.mimetype);
    var extname = FileTypes.test(_path["default"].extname(file.originalname));
    if (mimType && extname) {
      return callback(null, true);
    }
    callback(new Error('File type not supported'));
  }
});
exports.handleMultipartDataVideo = handleMultipartDataVideo;