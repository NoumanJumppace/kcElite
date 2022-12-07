"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.generateToken = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var generateToken = function generateToken(payload) {
  return _jsonwebtoken["default"].sign({
    payload: payload
  }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};
exports.generateToken = generateToken;
var verifyToken = function verifyToken(token) {
  return _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET);
};
exports.verifyToken = verifyToken;