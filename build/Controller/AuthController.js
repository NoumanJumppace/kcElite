"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _path = _interopRequireDefault(require("path"));
var _fs = _interopRequireDefault(require("fs"));
var _moment = _interopRequireDefault(require("moment"));
var _ParentsModel = _interopRequireDefault(require("../DB/Models/ParentsModel.js"));
var _OtpModel = _interopRequireDefault(require("../DB/Models/OtpModel.js"));
var _ChildModel = _interopRequireDefault(require("../DB/Models/ChildModel.js"));
var _SubscriptionModel = _interopRequireDefault(require("../DB/Models/SubscriptionModel.js"));
var _ForgetPasswordModel = _interopRequireDefault(require("../DB/Models/ForgetPasswordModel.js"));
var _GradesModel = _interopRequireDefault(require("../DB/Models/GradesModel.js"));
var _CustomError = _interopRequireDefault(require("../Utils/ResponseHandler/CustomError.js"));
var _CustomSuccess = _interopRequireDefault(require("../Utils/ResponseHandler/CustomSuccess.js"));
var _UserResource = _interopRequireDefault(require("../Utils/Resource/UserResource.js"));
var _UserValidator = require("../Utils/Validator/UserValidator.js");
var _SecuringPassword = require("../Utils/SecuringPassword.js");
var _SendEmail = require("../Utils/SendEmail.js");
var _jwt = require("../Utils/jwt.js");
var _MultipartData = require("../Utils/MultipartData.js");
// Models

// Utils (Response, Error, Logger)

var registerParents = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var _RegisterValidator$va, error, _req$body, phone, email, deviceToken, password, confirmPassword, isParentExist, NewParent, ParentOtp, NewOtp, subject, template, accountName, accountPassword, NewChild, childSubject, Childtemplate, userResource;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            // Validate the request body
            _RegisterValidator$va = _UserValidator.RegisterValidator.validate(req.body), error = _RegisterValidator$va.error;
            if (!error) {
              _context.next = 4;
              break;
            }
            throw next(_CustomError["default"].createError(error.message, 200));
          case 4:
            // Check if the user already exists
            _req$body = req.body, phone = _req$body.phone, email = _req$body.email, deviceToken = _req$body.deviceToken, password = _req$body.password, confirmPassword = _req$body.confirmPassword; // Get Device Address
            // const deviceAddress = req.connection.remoteAddress
            // console.log(deviceAddress, "deviceAddress");
            // Make sure the password and confirm password are the same
            if (!(password !== confirmPassword)) {
              _context.next = 7;
              break;
            }
            throw next(_CustomError["default"].createError('Password and confirm password must be the same', 200));
          case 7:
            _context.next = 9;
            return _ParentsModel["default"].findOne({
              $or: [{
                email: email
              }, {
                phone: phone
              }]
            });
          case 9:
            isParentExist = _context.sent;
            if (!isParentExist) {
              _context.next = 12;
              break;
            }
            return _context.abrupt("return", next(_CustomError["default"].createError('Parent already exist', 200)));
          case 12:
            _context.next = 14;
            return _ParentsModel["default"].create({
              phone: phone,
              email: email,
              deviceToken: deviceToken,
              password: (0, _SecuringPassword.hashPassword)(password)
            });
          case 14:
            NewParent = _context.sent;
            // Create 6 digit OTP
            ParentOtp = Math.floor(100000 + Math.random() * 900000); // Check if Parent Already has OTP
            _context.next = 18;
            return _OtpModel["default"].create({
              parent_id: NewParent._id,
              otp: ParentOtp,
              is_verified: false,
              verfiy_at: null
            });
          case 18:
            NewOtp = _context.sent;
            // Send OTP to the Parenet
            subject = 'OTP for Registration';
            _context.next = 22;
            return (0, _SendEmail.getFileContent)(_path["default"].join('src', 'Static', 'create-user.html'));
          case 22:
            template = _context.sent;
            // template = template.replace('{{email}}', NewParent.email);
            // template = template.replace('{{phoneNumber}}', NewParent.phone);
            template = template.replace('{{verifcation}}', NewOtp.otp);
            // template = template.replace("{{link}}", `https://${req.headers.host}/verfiy-email?token=${NewParent.token}`);
            (0, _SendEmail.sendEmails)(NewParent.email, subject, template, function (err, data) {
              if (err) {
                console.error(err);
              } else {
                console.log(data, 'sendEmails in AuthController');
              }
            });

            // Generate Random Account Name  with Parent Email And Add Random Account Name with 6 Alphabets and 6 Numbers
            accountName = NewParent.email.split('@')[0] + Math.floor(100000 + Math.random() * 900000); // Generte Random Account Password with 10 Alphabets or 10 Numbers
            accountPassword = Math.random().toString(36).slice(-10); // Create new Child Account
            _context.next = 29;
            return _ChildModel["default"].create({
              parent: NewParent._id,
              email: accountName,
              password: (0, _SecuringPassword.hashPassword)(accountPassword)
            });
          case 29:
            NewChild = _context.sent;
            _context.next = 32;
            return _ParentsModel["default"].findByIdAndUpdate(NewParent._id, {
              $push: {
                child: NewChild._id
              }
            }, {
              "new": true
            });
          case 32:
            // Send Account Name and Password to the Parent
            childSubject = 'Child Account';
            _context.next = 35;
            return (0, _SendEmail.getFileContent)(_path["default"].join('src', 'Static', 'ChildAccount.html'));
          case 35:
            Childtemplate = _context.sent;
            Childtemplate = Childtemplate.replace('{{accname}}', accountName);
            Childtemplate = Childtemplate.replace('{{accpass}}', accountPassword);
            (0, _SendEmail.sendEmails)(NewParent.email, childSubject, Childtemplate, function (err, data) {
              if (err) {
                console.error(err);
              } else {
                console.log(data, 'Send Email AuthController');
              }
            });
            userResource = _UserResource["default"].UserAndOtp(NewParent, NewOtp); // Send Response
            return _context.abrupt("return", next(_CustomSuccess["default"].createSuccess(userResource, 'Successfull Sign Up', 201)));
          case 43:
            _context.prev = 43;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0);
            // next(CustomError.createError(error.message, 200));
          case 46:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 43]]);
  }));
  return function registerParents(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var Login = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var _LoginValidator$valid, error, email, RequestBody, isParent, isChild, UserDetail, token, userResource;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            // Validate the request body
            _LoginValidator$valid = _UserValidator.LoginValidator.validate(req.body), error = _LoginValidator$valid.error;
            if (!error) {
              _context2.next = 4;
              break;
            }
            throw next(_CustomError["default"].createError(error.message, 200));
          case 4:
            // const deviceAddress = req.connection.remoteAddress
            // console.log(deviceAddress, "deviceAddress");
            email = req.body.email;
            RequestBody = req.body;
            _context2.next = 8;
            return _ParentsModel["default"].findOne({
              email: email
            });
          case 8:
            isParent = _context2.sent;
            _context2.next = 11;
            return _ChildModel["default"].findOne({
              email: email
            }).populate(['parent', 'grade']);
          case 11:
            isChild = _context2.sent;
            if (!(!isParent && !isChild)) {
              _context2.next = 14;
              break;
            }
            throw next(_CustomError["default"].createError('Invalid Email or Password', 200));
          case 14:
            if (!isParent) {
              _context2.next = 18;
              break;
            }
            _context2.next = 17;
            return ParentLogin({
              RequestBody: RequestBody,
              isParent: isParent
            }, res, next);
          case 17:
            UserDetail = _context2.sent;
          case 18:
            if (!isChild) {
              _context2.next = 22;
              break;
            }
            _context2.next = 21;
            return ChildLogin({
              RequestBody: RequestBody,
              isChild: isChild
            }, res, next);
          case 21:
            UserDetail = _context2.sent;
          case 22:
            // Generate Token
            token = (0, _jwt.generateToken)(UserDetail); // Generate User Resource
            userResource = _UserResource["default"].UserAndToken(UserDetail, token); // Send Response
            return _context2.abrupt("return", next(_CustomSuccess["default"].createSuccess(userResource, 'Successfull Login', 200)));
          case 27:
            _context2.prev = 27;
            _context2.t0 = _context2["catch"](0);
            console.error(_context2.t0);
            // next(CustomError.createError(error.message, 200));
          case 30:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 27]]);
  }));
  return function Login(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var ParentsProfile = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var _AfterSignupValidator, error, _req$body2, id, fullName, address, city, state, childname, childgrade, childbirthdate, profilePicture, isParent, profilePictureS, oldImage, updateParent, childBirthdate, isGrade, userResource;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _AfterSignupValidator = _UserValidator.AfterSignupValidator.validate(req.body), error = _AfterSignupValidator.error;
            if (!error) {
              _context3.next = 4;
              break;
            }
            throw next(_CustomError["default"].createError(error.message, 200));
          case 4:
            _req$body2 = req.body, id = _req$body2.id, fullName = _req$body2.fullName, address = _req$body2.address, city = _req$body2.city, state = _req$body2.state, childname = _req$body2.childname, childgrade = _req$body2.childgrade, childbirthdate = _req$body2.childbirthdate;
            profilePicture = req.file;
            _context3.next = 8;
            return _ParentsModel["default"].findOne({
              _id: id
            });
          case 8:
            isParent = _context3.sent;
            if (isParent) {
              _context3.next = 11;
              break;
            }
            return _context3.abrupt("return", next(_CustomError["default"].createError('Parent not found', 404)));
          case 11:
            // const userImage = profilePicture.filename
            // const ImgUrl = `http://${req.headers.host}/uploads/${userImage}`
            profilePictureS = profilePicture.path; // Delete the old image if exist
            if (isParent.profilePicture) {
              oldImage = isParent.profilePicture.split('/').pop(); // console.log(oldImage, "oldImage");
              // Delete the old image
              _fs["default"].unlink(_path["default"].join('uploads', oldImage), function (err) {
                if (err) {
                  console.error(err);
                }
              });
            }
            // Update the Parent Profile
            _context3.next = 15;
            return _ParentsModel["default"].findByIdAndUpdate(isParent._id, {
              fullName: fullName,
              address: address,
              city: city,
              state: state,
              profilePicture: profilePictureS
            }, {
              "new": true
            });
          case 15:
            updateParent = _context3.sent;
            // Update the Child Profile
            // Change Child Birthdate to Date
            childBirthdate = new Date(childbirthdate); // Check if Grade Exist
            // console.log(childgrade, "isGrade");
            _context3.next = 19;
            return _GradesModel["default"].findOne({
              _id: childgrade
            });
          case 19:
            isGrade = _context3.sent;
            console.log(isGrade, 'isGrade');
            if (isGrade) {
              _context3.next = 23;
              break;
            }
            return _context3.abrupt("return", next(_CustomError["default"].createError('Grade not found', 404)));
          case 23:
            _context3.next = 25;
            return _ChildModel["default"].findOneAndUpdate({
              parent: isParent._id
            }, {
              fullName: childname,
              grade: isGrade,
              birthdate: (0, _moment["default"])(childBirthdate).format('YYYY-MM-DD')
            }, {
              "new": true
            });
          case 25:
            // Generate User Resource
            userResource = _UserResource["default"].User(updateParent); // Send Response
            return _context3.abrupt("return", next(_CustomSuccess["default"].createSuccess(userResource, 'Successfull Profile Update', 200)));
          case 29:
            _context3.prev = 29;
            _context3.t0 = _context3["catch"](0);
          case 31:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 29]]);
  }));
  return function ParentsProfile(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
var ForgotPasswordOPT = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var _ForgotPasswordValida, error, email, UserDetail, isParent, isChild, OTP, ParentDetail, isOtp, OPTs, subject, template;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            // VAlidate the request body
            _ForgotPasswordValida = _UserValidator.ForgotPasswordValidator.validate(req.body), error = _ForgotPasswordValida.error;
            if (!error) {
              _context4.next = 4;
              break;
            }
            throw next(_CustomError["default"].createError(error.message, 200));
          case 4:
            email = req.body.email;
            _context4.next = 7;
            return _ParentsModel["default"].findOne({
              $or: [{
                email: email
              }, {
                phone: email
              }]
            });
          case 7:
            isParent = _context4.sent;
            _context4.next = 10;
            return _ChildModel["default"].findOne({
              email: email
            });
          case 10:
            isChild = _context4.sent;
            if (!(!isParent && !isChild)) {
              _context4.next = 13;
              break;
            }
            throw next(_CustomError["default"].createError('Invalid Email', 200));
          case 13:
            // Generate 6 Digit OTP
            OTP = Math.floor(100000 + Math.random() * 900000);
            if (isParent) {
              UserDetail = isParent;
            }
            if (!isChild) {
              _context4.next = 20;
              break;
            }
            _context4.next = 18;
            return _ParentsModel["default"].findOne({
              _id: isChild.parent
            });
          case 18:
            ParentDetail = _context4.sent;
            UserDetail = ParentDetail;
          case 20:
            _context4.next = 22;
            return _ForgetPasswordModel["default"].findOne({
              user_id: UserDetail._id
            });
          case 22:
            isOtp = _context4.sent;
            if (!isOtp) {
              _context4.next = 29;
              break;
            }
            _context4.next = 26;
            return _ForgetPasswordModel["default"].findOneAndUpdate({
              user_id: UserDetail._id
            }, {
              forgetOtp: OTP,
              type: isParent ? 'parent' : 'child'
            }, {
              "new": true
            });
          case 26:
            OPTs = _context4.sent;
            _context4.next = 32;
            break;
          case 29:
            _context4.next = 31;
            return _ForgetPasswordModel["default"].create({
              user_id: UserDetail._id,
              forgetOtp: OTP,
              type: isParent ? 'parent' : 'child'
            });
          case 31:
            OPTs = _context4.sent;
          case 32:
            // Send OTP to the Parent/Child
            subject = 'OTP for Reset Password';
            _context4.next = 35;
            return (0, _SendEmail.getFileContent)(_path["default"].join('src', 'Static', 'ForgetPassword.html'));
          case 35:
            template = _context4.sent;
            template = template.replace('{{Opts}}', OPTs.forgetOtp);
            // template = template.replace("{{link}}", `https://${req.headers.host}/verfiy-email?token=${NewParent.token}`);
            (0, _SendEmail.sendEmails)(UserDetail.email, subject, template, function (err, data) {
              if (err) {
                console.error(err);
              } else {
                console.log(data, 'Email AuthController');
              }
            });
            // Send Response
            return _context4.abrupt("return", next(_CustomSuccess["default"].createSuccess(UserDetail, 'OTP sent successfully', 200)));
          case 41:
            _context4.prev = 41;
            _context4.t0 = _context4["catch"](0);
          case 43:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 41]]);
  }));
  return function ForgotPasswordOPT(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();
var VerifyPasswordOtp = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var _ResetPasswordOTPVali, error, _req$body3, user_id, otp, isParentExist, isChildExist, UserDetail, isOtpExist, userResource;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.prev = 1;
            // VAlidate the request body
            _ResetPasswordOTPVali = _UserValidator.ResetPasswordOTPValidator.validate(req.body), error = _ResetPasswordOTPVali.error;
            if (!error) {
              _context5.next = 5;
              break;
            }
            throw next(_CustomError["default"].createError(error.message, 200));
          case 5:
            _req$body3 = req.body, user_id = _req$body3.user_id, otp = _req$body3.otp; // Check if the parent exist
            _context5.next = 8;
            return _ParentsModel["default"].findOne({
              _id: user_id
            });
          case 8:
            isParentExist = _context5.sent;
            _context5.next = 11;
            return _ChildModel["default"].findOne({
              _id: user_id
            });
          case 11:
            isChildExist = _context5.sent;
            if (!(!isParentExist && !isChildExist)) {
              _context5.next = 14;
              break;
            }
            throw next(_CustomError["default"].createError('Invalid User', 200));
          case 14:
            if (isParentExist) {
              UserDetail = isParentExist;
            }
            if (isChildExist) {
              UserDetail = isChildExist;
            }

            // Check if the OTP exist
            _context5.next = 18;
            return _ForgetPasswordModel["default"].findOne({
              user_id: UserDetail._id
            });
          case 18:
            isOtpExist = _context5.sent;
            if (isOtpExist) {
              _context5.next = 21;
              break;
            }
            return _context5.abrupt("return", next(_CustomError["default"].createError('OTP does not exist', 200)));
          case 21:
            if (!isOtpExist.is_used) {
              _context5.next = 23;
              break;
            }
            return _context5.abrupt("return", next(_CustomError["default"].createError('OTP already Used', 200)));
          case 23:
            if (!(isOtpExist.forgetOtp !== otp)) {
              _context5.next = 25;
              break;
            }
            return _context5.abrupt("return", next(_CustomError["default"].createError('OTP is incorrect', 200)));
          case 25:
            _context5.next = 27;
            return _ForgetPasswordModel["default"].findByIdAndUpdate(isOtpExist._id, {
              forgetOtp: null,
              is_used: true,
              used_at: Date.now()
            });
          case 27:
            // Login the Parent
            // Generate Token
            // const token = generateToken(UserDetail);
            // Generate User Resource
            userResource = _UserResource["default"].User(UserDetail); // Send Response
            return _context5.abrupt("return", next(_CustomSuccess["default"].createSuccess(userResource, 'OTP verified successfully', 200)));
          case 31:
            _context5.prev = 31;
            _context5.t0 = _context5["catch"](1);
            console.error(_context5.t0);
          case 34:
            _context5.next = 38;
            break;
          case 36:
            _context5.prev = 36;
            _context5.t1 = _context5["catch"](0);
          case 38:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 36], [1, 31]]);
  }));
  return function VerifyPasswordOtp(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();
var ResetPassword = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var _ResetPasswordValidat, error, _req$body4, user_id, password, confirmPassword, CheckOtpUsed, UserDetail, isParentExist, isChildExist, hashedPassword;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            // VAlidate the request body
            _ResetPasswordValidat = _UserValidator.ResetPasswordValidator.validate(req.body), error = _ResetPasswordValidat.error;
            if (!error) {
              _context6.next = 4;
              break;
            }
            throw next(_CustomError["default"].createError(error.message, 200));
          case 4:
            _req$body4 = req.body, user_id = _req$body4.user_id, password = _req$body4.password, confirmPassword = _req$body4.confirmPassword; // Check if the ForgetPassword OTP Used
            _context6.next = 7;
            return _ForgetPasswordModel["default"].findOne({
              user_id: user_id,
              is_used: true
            });
          case 7:
            CheckOtpUsed = _context6.sent;
            if (CheckOtpUsed) {
              _context6.next = 10;
              break;
            }
            return _context6.abrupt("return", next(_CustomError["default"].createError('OTP is not verified', 200)));
          case 10:
            if (!(password !== confirmPassword)) {
              _context6.next = 12;
              break;
            }
            return _context6.abrupt("return", next(_CustomError["default"].createError('Password do not match', 200)));
          case 12:
            _context6.next = 14;
            return _ParentsModel["default"].findOne({
              _id: user_id
            });
          case 14:
            isParentExist = _context6.sent;
            _context6.next = 17;
            return _ChildModel["default"].findOne({
              _id: user_id
            });
          case 17:
            isChildExist = _context6.sent;
            if (!(!isParentExist && !isChildExist)) {
              _context6.next = 20;
              break;
            }
            throw next(_CustomError["default"].createError('Invalid User', 200));
          case 20:
            // Hash the Password
            hashedPassword = (0, _SecuringPassword.hashPassword)(password);
            if (!isParentExist) {
              _context6.next = 25;
              break;
            }
            UserDetail = isParentExist;
            _context6.next = 25;
            return _ParentsModel["default"].findByIdAndUpdate(UserDetail._id, {
              password: hashedPassword
            });
          case 25:
            if (!isChildExist) {
              _context6.next = 29;
              break;
            }
            UserDetail = isChildExist;
            _context6.next = 29;
            return _ChildModel["default"].findByIdAndUpdate(UserDetail._id, {
              password: hashedPassword
            });
          case 29:
            return _context6.abrupt("return", next(_CustomSuccess["default"].createSuccess(null, 'Password reset successfully', 200)));
          case 32:
            _context6.prev = 32;
            _context6.t0 = _context6["catch"](0);
            console.error(_context6.t0);
            // next(CustomError.createError(error.message, 200));
          case 35:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 32]]);
  }));
  return function ResetPassword(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();

// Sub Functions for Login
var ParentLogin = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
    var RequestBody, isParent, isPasswordCorrect, isOtpVerified, userOpt;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            RequestBody = req.RequestBody, isParent = req.isParent; // Match the password
            isPasswordCorrect = (0, _SecuringPassword.comparePassword)(RequestBody.password, isParent.password);
            if (isPasswordCorrect) {
              _context7.next = 5;
              break;
            }
            return _context7.abrupt("return", next(_CustomError["default"].createError('Invalid Password', 200)));
          case 5:
            _context7.next = 7;
            return _OtpModel["default"].findOne({
              parent_id: isParent._id,
              is_verified: true
            });
          case 7:
            isOtpVerified = _context7.sent;
            if (isOtpVerified) {
              _context7.next = 11;
              break;
            }
            userOpt = _UserResource["default"].User(isParent);
            return _context7.abrupt("return", res.status(200).json({
              status: 'error',
              message: 'Please verify your OTP',
              user: userOpt
            }));
          case 11:
            return _context7.abrupt("return", isParent);
          case 14:
            _context7.prev = 14;
            _context7.t0 = _context7["catch"](0);
          case 16:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 14]]);
  }));
  return function ParentLogin(_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}();
var ChildLogin = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res, next) {
    var RequestBody, isChild, isPasswordCorrect, isParent, isOtpVerified, userOpt, sub, isSubscriptionExpired, CurrentDate;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            RequestBody = req.RequestBody, isChild = req.isChild; // Match the password
            isPasswordCorrect = (0, _SecuringPassword.comparePassword)(RequestBody.password, isChild.password);
            if (isPasswordCorrect) {
              _context8.next = 5;
              break;
            }
            return _context8.abrupt("return", next(_CustomError["default"].createError('Invalid Password', 200)));
          case 5:
            _context8.next = 7;
            return _ParentsModel["default"].findOne({
              _id: isChild.parent
            }).populate('subscription');
          case 7:
            isParent = _context8.sent;
            _context8.next = 10;
            return _OtpModel["default"].findOne({
              parent_id: isParent._id,
              is_verified: true
            });
          case 10:
            isOtpVerified = _context8.sent;
            if (isOtpVerified) {
              _context8.next = 14;
              break;
            }
            userOpt = _UserResource["default"].User(isParent);
            return _context8.abrupt("return", next(_CustomSuccess["default"].createSuccess(userOpt, 'Please verify your OTP', 200)));
          case 14:
            if (isParent.subscription) {
              _context8.next = 16;
              break;
            }
            return _context8.abrupt("return", next(_CustomError["default"].createError('Please subscribe to the plan', 200)));
          case 16:
            // Get First Subscription From Parent Subscription Array
            sub = isParent.subscription[0]; // Chcek if the Subscription is expired
            _context8.next = 19;
            return _SubscriptionModel["default"].findOne({
              _id: sub,
              status: true
            });
          case 19:
            isSubscriptionExpired = _context8.sent;
            // Check Expired Date
            CurrentDate = new Date();
            if (!(isSubscriptionExpired.expiryDate < CurrentDate)) {
              _context8.next = 23;
              break;
            }
            return _context8.abrupt("return", next(_CustomError["default"].createError('Your Subscription is expired', 200)));
          case 23:
            return _context8.abrupt("return", isChild);
          case 26:
            _context8.prev = 26;
            _context8.t0 = _context8["catch"](0);
            console.error(_context8.t0);
            // next(CustomError.createError(error.message, 200));
          case 29:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 26]]);
  }));
  return function ChildLogin(_x22, _x23, _x24) {
    return _ref8.apply(this, arguments);
  };
}();
// Sub Functions for Forgot Password

// Export the module es6
var AuthController = {
  registerParents: registerParents,
  Login: Login,
  ParentsProfile: [_MultipartData.handleMultipartData.single('profilePicture'), ParentsProfile],
  ForgotPasswordOPT: ForgotPasswordOPT,
  VerifyPasswordOtp: VerifyPasswordOtp,
  ResetPassword: ResetPassword
};
var _default = AuthController;
exports["default"] = _default;