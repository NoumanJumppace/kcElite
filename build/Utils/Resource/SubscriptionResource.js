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
var SubscriptionResource = /*#__PURE__*/function () {
  function SubscriptionResource(Subscriptions) {
    (0, _classCallCheck2["default"])(this, SubscriptionResource);
    this.id = Subscriptions._id;
  }
  (0, _createClass2["default"])(SubscriptionResource, null, [{
    key: "SingleSubscription",
    value: function SingleSubscription(subscription) {
      return {
        id: subscription._id,
        subscriptionType: {
          id: subscription.subscriptionType._id,
          name: subscription.subscriptionType.name,
          description: subscription.subscriptionType.description,
          price: subscription.subscriptionType.price,
          duration: subscription.subscriptionType.duration,
          createdAt: (0, _moment["default"])(subscription.subscriptionType.createdAt).format('YYYY-MM-DD HH:mm:ss')
        },
        child: subscription.child.map(function (child) {
          return {
            id: child._id,
            fullName: child.fullName,
            profilePicture: child.profilePicture,
            phone: child.phone,
            email: child.email,
            address: child.address,
            city: child.city,
            state: child.state,
            grade: child.grade,
            birthdate: child.birthdate,
            tier: child.tier,
            parent_id: child.parent,
            subscription: child.subscription,
            createdAt: (0, _moment["default"])(child.createdAt).format('YYYY-MM-DD HH:mm:ss')
          };
        }),
        duration: subscription.duration,
        totalAmount: subscription.totalAmount,
        status: subscription.status,
        expiryDate: (0, _moment["default"])(subscription.expiryDate).format('YYYY-MM-DD HH:mm:ss'),
        purchaseDate: (0, _moment["default"])(subscription.purchaseDate).format('YYYY-MM-DD HH:mm:ss'),
        createdAt: (0, _moment["default"])(subscription.createdAt).format('YYYY-MM-DD HH:mm:ss')
      };
    }
  }]);
  return SubscriptionResource;
}();
var _default = SubscriptionResource;
exports["default"] = _default;