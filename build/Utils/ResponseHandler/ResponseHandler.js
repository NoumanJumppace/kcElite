"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResHandler = void 0;
var _joi = _interopRequireDefault(require("joi"));
var _CustomError = _interopRequireDefault(require("./CustomError.js"));
var _CustomSuccess = _interopRequireDefault(require("./CustomSuccess.js"));
var ValidationError = _joi["default"].ValidationError;
var ResHandler = function ResHandler(err, req, res, next) {
  var StatusCode = 500;
  var Data = {
    message: err.message,
    status: false
  };
  if (err instanceof ValidationError) {
    StatusCode = 400;
    Data = {
      message: err.message,
      status: false
    };
  }
  if (err instanceof _CustomError["default"]) {
    StatusCode = err.status;
    Data = {
      message: err.message,
      status: false
    };
  }

  // err instanceof CustomSuccess
  if (err instanceof _CustomSuccess["default"]) {
    StatusCode = err.status;
    Data = {
      message: err.message,
      data: err.Data,
      status: true
    };
  }
  return next(res.status(StatusCode).json(Data));
};
exports.ResHandler = ResHandler;