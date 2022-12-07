"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyOtp = exports.resendOtp = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _path = _interopRequireDefault(require("path"));
var _ParentsModel = _interopRequireDefault(require("../DB/Models/ParentsModel.js"));
var _OtpModel = _interopRequireDefault(require("../DB/Models/OtpModel.js"));
var _CustomError = _interopRequireDefault(require("../Utils/ResponseHandler/CustomError.js"));
var _CustomSuccess = _interopRequireDefault(require("../Utils/ResponseHandler/CustomSuccess.js"));
var _SendEmail = require("../Utils/SendEmail.js");
var _UserResource = _interopRequireDefault(require("../Utils/Resource/UserResource.js"));
var _jwt = require("../Utils/jwt.js");
// Models

// Utils (Response, Error, Logger)

var resendOtp = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var parent_id, isParentExist, ParentOtp, isOtpExist, subject, template;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            parent_id = req.params.parent_id; // Check if the parent exist
            _context.next = 4;
            return _ParentsModel["default"].findOne({
              _id: parent_id
            });
          case 4:
            isParentExist = _context.sent;
            if (isParentExist) {
              _context.next = 7;
              break;
            }
            return _context.abrupt("return", next(_CustomError["default"].createError('Parent does not exist', 200)));
          case 7:
            // Create 6 digit OTP
            ParentOtp = Math.floor(100000 + Math.random() * 900000); // Check if Parent Already has OTP
            _context.next = 10;
            return _OtpModel["default"].findOne({
              parent_id: parent_id
            });
          case 10:
            isOtpExist = _context.sent;
            if (!isOtpExist) {
              _context.next = 16;
              break;
            }
            _context.next = 14;
            return _OtpModel["default"].findByIdAndUpdate(isOtpExist._id, {
              otp: ParentOtp,
              is_verified: false,
              verfiy_at: null
            });
          case 14:
            _context.next = 18;
            break;
          case 16:
            _context.next = 18;
            return _OtpModel["default"].create({
              parent_id: parent_id,
              otp: ParentOtp,
              is_verified: false,
              verfiy_at: null
            });
          case 18:
            // Send OTP to the Parenet
            subject = 'OTP for registration';
            _context.next = 21;
            return (0, _SendEmail.getFileContent)(_path["default"].join('src', 'Static', 'create-user.html'));
          case 21:
            template = _context.sent;
            template = template.replace('{{email}}', isParentExist.email);
            template = template.replace('{{phoneNumber}}', isParentExist.phone);
            template = template.replace('{{verifcation}}', ParentOtp);
            // template = template.replace("{{link}}", `https://${req.headers.host}/verfiy-email?token=${NewParent.token}`);
            (0, _SendEmail.sendEmails)(isParentExist.email, subject, template, function (err, data) {
              if (err) {
                console.error(err);
              } else {
                console.log(data, 'Email sent in OTP Controller');
              }
            });
            // Send Response
            return _context.abrupt("return", next(_CustomSuccess["default"].createSuccess(null, 'OTP sent successfully', 200)));
          case 29:
            _context.prev = 29;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0);
          case 32:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 29]]);
  }));
  return function resendOtp(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
exports.resendOtp = resendOtp;
var verifyOtp = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var _req$body, parent_id, otp, isParentExist, isOtpExist, UserDetail, token, userResource;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body = req.body, parent_id = _req$body.parent_id, otp = _req$body.otp; // Check if the parent exist
            _context2.next = 4;
            return _ParentsModel["default"].findOne({
              _id: parent_id
            });
          case 4:
            isParentExist = _context2.sent;
            if (isParentExist) {
              _context2.next = 7;
              break;
            }
            return _context2.abrupt("return", next(_CustomError["default"].createError('Parent does not exist', 200)));
          case 7:
            _context2.next = 9;
            return _OtpModel["default"].findOne({
              parent_id: parent_id
            });
          case 9:
            isOtpExist = _context2.sent;
            if (isOtpExist) {
              _context2.next = 12;
              break;
            }
            return _context2.abrupt("return", next(_CustomError["default"].createError('OTP does not exist', 200)));
          case 12:
            if (!isOtpExist.is_verified) {
              _context2.next = 14;
              break;
            }
            return _context2.abrupt("return", next(_CustomError["default"].createError('OTP already verified', 200)));
          case 14:
            if (!(isOtpExist.otp !== otp)) {
              _context2.next = 16;
              break;
            }
            return _context2.abrupt("return", next(_CustomError["default"].createError('OTP is incorrect', 200)));
          case 16:
            _context2.next = 18;
            return _OtpModel["default"].findByIdAndUpdate(isOtpExist._id, {
              otp: null,
              is_verified: true,
              verfiy_at: Date.now()
            });
          case 18:
            // Login the Parent
            // console.log(isParentExist);
            UserDetail = isParentExist; // Generate Token
            token = (0, _jwt.generateToken)(UserDetail); // Generate User Resource
            userResource = _UserResource["default"].UserAndToken(UserDetail, token); // Send Response
            return _context2.abrupt("return", next(_CustomSuccess["default"].createSuccess(userResource, 'OTP verified successfully', 200)));
          case 24:
            _context2.prev = 24;
            _context2.t0 = _context2["catch"](0);
            console.error(_context2.t0);
          case 27:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 24]]);
  }));
  return function verifyOtp(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
exports.verifyOtp = verifyOtp;