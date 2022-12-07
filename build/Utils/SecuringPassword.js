"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hashPassword = exports.comparePassword = void 0;
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var hashPassword = function hashPassword(password) {
  var salt = _bcrypt["default"].genSaltSync(10);
  var hash = _bcrypt["default"].hashSync(password, salt);
  return hash;
};
exports.hashPassword = hashPassword;
var comparePassword = function comparePassword(password, receivedPassword) {
  return _bcrypt["default"].compareSync(password, receivedPassword);
};
exports.comparePassword = comparePassword;