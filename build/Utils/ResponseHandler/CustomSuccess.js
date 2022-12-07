"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var CustomSuccess = /*#__PURE__*/function () {
  function CustomSuccess(Data, message, status) {
    (0, _classCallCheck2["default"])(this, CustomSuccess);
    this.Data = Data;
    this.message = message;
    this.status = status;
  }
  (0, _createClass2["default"])(CustomSuccess, null, [{
    key: "createSuccess",
    value: function createSuccess(Data, message, status) {
      return new CustomSuccess(Data, message, status);
    }
  }, {
    key: "ok",
    value: function ok() {
      var Data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Success';
      return new CustomSuccess(Data, 200);
    }
  }, {
    key: "created",
    value: function created(Data) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Created';
      return new CustomSuccess(Data, message, 201);
    }
  }, {
    key: "accepted",
    value: function accepted(Data) {
      return new CustomSuccess(Data, 202);
    }
  }, {
    key: "noContent",
    value: function noContent(Data) {
      return new CustomSuccess(Data, 204);
    }
  }]);
  return CustomSuccess;
}();
var _default = CustomSuccess;
exports["default"] = _default;