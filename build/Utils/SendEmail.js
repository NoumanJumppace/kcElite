"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.streamToBuffer = exports.sendEmails = exports.getFileContent = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _fs = _interopRequireDefault(require("fs"));
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _emailConfig = require("../Config/emailConfig.js");
// create reusable transporter object using the default SMTP transport
var transporter = _nodemailer["default"].createTransport(_emailConfig.emailConfig);

// Converting Stream to Buffer

var streamToBuffer = function streamToBuffer(stream) {
  return new Promise(function (resolve, reject) {
    var buffers = [];
    stream.on('data', function (data) {
      return buffers.push(data);
    });
    stream.on('error', reject);
    stream.on('end', function () {
      return resolve(Buffer.concat(buffers));
    });
  });
};

// GetFile Contant
exports.streamToBuffer = streamToBuffer;
var getFileContent = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(filePath) {
    var fileStream, buffer;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fileStream = _fs["default"].createReadStream(filePath);
            _context.next = 3;
            return streamToBuffer(fileStream);
          case 3:
            buffer = _context.sent;
            return _context.abrupt("return", buffer.toString());
          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function getFileContent(_x) {
    return _ref.apply(this, arguments);
  };
}();

// send mail with defined transport object
exports.getFileContent = getFileContent;
var sendEmails = function sendEmails(to, subject, content, next) {
  try {
    var message = {
      from: {
        name: process.env.MAIL_FROM_NAME,
        address: process.env.MAIL_USERNAME
      },
      to: to,
      subject: subject,
      html: content
    };
    transporter.sendMail(message, next);
  } catch (error) {
    console.error(error);
  }
};
exports.sendEmails = sendEmails;