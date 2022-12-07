"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var CustomError = /*#__PURE__*/function (_Error) {
  (0, _inherits2["default"])(CustomError, _Error);
  var _super = _createSuper(CustomError);
  function CustomError(message, status) {
    var _this;
    (0, _classCallCheck2["default"])(this, CustomError);
    _this = _super.call(this, message);
    _this.status = status;
    _this.message = message;
    return _this;
  }
  (0, _createClass2["default"])(CustomError, null, [{
    key: "createError",
    value: function createError(message, status) {
      return new CustomError(message, status);
    }
  }, {
    key: "notFound",
    value: function notFound() {
      var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Not Found';
      return new CustomError(message, 404);
    }
  }, {
    key: "badRequest",
    value: function badRequest() {
      var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Bad Request';
      return new CustomError(message, 400);
    }
  }, {
    key: "unauthorized",
    value: function unauthorized() {
      var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Unauthorized';
      return new CustomError(message, 401);
    }
  }, {
    key: "forbidden",
    value: function forbidden() {
      var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Forbidden';
      return new CustomError(message, 403);
    }
  }, {
    key: "internal",
    value: function internal() {
      var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Internal Server Error';
      return new CustomError(message, 500);
    }
  }, {
    key: "DataWithErrors",
    value: function DataWithErrors(data, message, status) {
      return {
        user: data,
        message: message,
        status: status
      };
    }
  }]);
  return CustomError;
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(Error));
var _default = CustomError;
exports["default"] = _default;