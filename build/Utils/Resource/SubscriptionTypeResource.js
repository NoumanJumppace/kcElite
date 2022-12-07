"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _moment = _interopRequireDefault(require("moment"));
// Create SubscriptionTypeResource class For Response
var SubscriptionTypeResource = /*#__PURE__*/function () {
  function SubscriptionTypeResource(Subscriptions) {
    (0, _classCallCheck2["default"])(this, SubscriptionTypeResource);
    this.Subscriptions = Subscriptions.map(function (subscription) {
      return {
        id: subscription._id,
        name: subscription.name,
        description: subscription.description,
        price: subscription.price,
        duration: subscription.duration.map(function (duration) {
          return {
            id: duration._id,
            month: duration.month
          };
        }),
        createdAt: (0, _moment["default"])(subscription.createdAt).format('YYYY-MM-DD HH:mm:ss')
      };
    });
  }
  (0, _createClass2["default"])(SubscriptionTypeResource, null, [{
    key: "SingleSubscription",
    value: function SingleSubscription(subscription) {
      return {
        id: subscription._id,
        name: subscription.name,
        description: subscription.description,
        price: subscription.price,
        duration: subscription.duration.map(function (duration) {
          return {
            month: duration.month
          };
        }),
        createdAt: (0, _moment["default"])(subscription.createdAt).format('YYYY-MM-DD HH:mm:ss')
      };
    }
  }]);
  return SubscriptionTypeResource;
}();
var _default = SubscriptionTypeResource;
exports["default"] = _default;