"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filename = exports.dirname = void 0;
var _path = _interopRequireDefault(require("path"));
var _url = require("url");
var filename = (0, _url.fileURLToPath)(import.meta.url);
exports.filename = filename;
var dirname = _path["default"].dirname(filename);
exports.dirname = dirname;