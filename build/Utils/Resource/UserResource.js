"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _moment = _interopRequireDefault(require("moment"));
// Create UserResource class For Response
var UserResource = /*#__PURE__*/function () {
  function UserResource(user) {
    (0, _classCallCheck2["default"])(this, UserResource);
    // Create UserObject
    this.UserObject = {
      id: user._id,
      phone: user.phone,
      email: user.email,
      createdAt: (0, _moment["default"])(user.createdAt).format('YYYY-MM-DD HH:mm:ss')
    };
    this.auth_token = user.auth_token;
  }
  (0, _createClass2["default"])(UserResource, null, [{
    key: "UserAndOtp",
    value: function UserAndOtp(user, otp) {
      // Create UserObject
      var UserObject = {
        id: user._id,
        phone: user.phone,
        email: user.email,
        is_verified: otp.is_verified,
        verfiy_at: otp.verfiy_at,
        createdAt: (0, _moment["default"])(user.createdAt).format('YYYY-MM-DD HH:mm:ss')
      };
      return {
        user: UserObject
      };
    }
  }, {
    key: "UserAndChild",
    value: function UserAndChild(user, child) {
      // Create UserObject
      var UserObject = {
        id: user._id,
        phone: user.phone,
        email: user.email,
        createdAt: (0, _moment["default"])(user.createdAt).format('YYYY-MM-DD HH:mm:ss')
      };
      return {
        user: UserObject,
        child: child
      };
    }
  }, {
    key: "UserAndToken",
    value: function UserAndToken(user, token) {
      // Create UserObject
      var UserObject = {
        id: user._id,
        fullName: user.fullName,
        profilePicture: process.env.SERVER_URL + user.profilePicture,
        phone: user.phone,
        email: user.email,
        address: user.address,
        city: user.city,
        // If Cant find Grade then return null
        grade: user.grade ? user.grade.name : null,
        state: user.state,
        birthdate: user.birthdate,
        tier: user.tier,
        parent_id: user.parent,
        subscription: user.subscription,
        createdAt: (0, _moment["default"])(user.createdAt).format('YYYY-MM-DD HH:mm:ss')
      };
      return {
        user: UserObject,
        token: token
      };
    }
  }, {
    key: "User",
    value: function User(user) {
      // Create UserObject
      var UserObject = {
        id: user._id,
        fullName: user.fullName,
        profilePicture: process.env.SERVER_URL + user.profilePicture,
        phone: user.phone,
        email: user.email,
        address: user.address,
        city: user.city,
        state: user.state,
        subscription: user.subscription,
        type: user.type,
        grade: user.grade ? user.grade.name : null,
        createdAt: (0, _moment["default"])(user.createdAt).format('YYYY-MM-DD HH:mm:ss')
      };
      return {
        user: UserObject
      };
    }
  }]);
  return UserResource;
}();
var _default = UserResource;
exports["default"] = _default;