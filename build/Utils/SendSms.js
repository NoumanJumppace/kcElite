"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SendSMS = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _twilio = _interopRequireDefault(require("twilio"));
var _smsConfig = _interopRequireDefault(require("../Config/smsConfig.js"));
var Client = (0, _twilio["default"])(_smsConfig["default"].Account_Sid, _smsConfig["default"].Auth_Token);
var SendSMS = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(to, smsBody, next) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return Client.messages.create({
              body: smsBody,
              from: '+18645286912',
              to: to
            }).then(function (message) {
              console.log(message);
              next;
            });
          case 3:
            _context.next = 8;
            break;
          case 5:
            _context.prev = 5;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0);
          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 5]]);
  }));
  return function SendSMS(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
exports.SendSMS = SendSMS;