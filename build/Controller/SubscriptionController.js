"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _ParentsModel = _interopRequireDefault(require("../DB/Models/ParentsModel.js"));
var _SubscriptionModel = _interopRequireDefault(require("../DB/Models/SubscriptionModel.js"));
var _SubscriptionTypesModel = _interopRequireDefault(require("../DB/Models/SubscriptionTypesModel.js"));
var _SubscriptionResource = _interopRequireDefault(require("../Utils/Resource/SubscriptionResource.js"));
var _SubscriptionTypeResource = _interopRequireDefault(require("../Utils/Resource/SubscriptionTypeResource.js"));
var _CustomError = _interopRequireDefault(require("../Utils/ResponseHandler/CustomError.js"));
var _CustomSuccess = _interopRequireDefault(require("../Utils/ResponseHandler/CustomSuccess.js"));
var _SubscriptionValidator = require("../Utils/Validator/SubscriptionValidator.js");
// Get All Subscriptions
var getAllSubscriptionsType = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var subscriptions, SubResource;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _SubscriptionTypesModel["default"].find();
          case 3:
            subscriptions = _context.sent;
            // Create SubscriptionResource
            SubResource = new _SubscriptionTypeResource["default"](subscriptions);
            return _context.abrupt("return", next(_CustomSuccess["default"].createSuccess(SubResource, 'All Subscriptions', 201)));
          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0);
          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));
  return function getAllSubscriptionsType(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
// Buy Subscription
var buySubscription = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var _SubscriptionPurchase, error, _req$body, subscriptionId, duration_id, Subscrip, durationExist, ChildAccount, OldSubscription, expiryDate, totalAmounts, newSubscription, SubscriptionDet, SubResource;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            // Validate Request
            _SubscriptionPurchase = _SubscriptionValidator.SubscriptionPurchaseValidator.validate(req.body), error = _SubscriptionPurchase.error;
            if (!error) {
              _context2.next = 4;
              break;
            }
            throw next(_CustomError["default"].createError(error.message, 200));
          case 4:
            _req$body = req.body, subscriptionId = _req$body.subscriptionId, duration_id = _req$body.duration_id; // Find Subscription By Id
            _context2.next = 7;
            return _SubscriptionTypesModel["default"].findById(subscriptionId);
          case 7:
            Subscrip = _context2.sent;
            if (Subscrip) {
              _context2.next = 10;
              break;
            }
            return _context2.abrupt("return", next(_CustomError["default"].createError('Subscription Not Found', 404)));
          case 10:
            // Find Duration By ID
            durationExist = Subscrip.duration.find(function (dur) {
              return dur._id.toString() === duration_id;
            });
            if (durationExist) {
              _context2.next = 13;
              break;
            }
            return _context2.abrupt("return", next(_CustomError["default"].createError('Duration Not Found', 404)));
          case 13:
            _context2.next = 15;
            return _ParentsModel["default"].findById(req.user._id).populate('child');
          case 15:
            ChildAccount = _context2.sent;
            _context2.next = 18;
            return _SubscriptionModel["default"].updateMany({
              parent: req.user._id
            }, {
              status: false
            });
          case 18:
            OldSubscription = _context2.sent;
            console.log(OldSubscription);
            // if (OldSubscription) {
            // Set Status To False
            // OldSubscription.status = false;
            // await OldSubscription.save();
            // }
            // Set Expiry Date
            expiryDate = new Date();
            expiryDate.setMonth(expiryDate.getMonth() + durationExist.month);
            // Price of Subscription multiplied by Duration
            totalAmounts = Subscrip.price * durationExist.month; // Create Subscription
            newSubscription = new _SubscriptionModel["default"]({
              parent: ChildAccount._id,
              subscriptionType: subscriptionId,
              child: ChildAccount.child,
              totalAmount: totalAmounts,
              duration: durationExist.month,
              expiryDate: expiryDate,
              purchaseDate: new Date(),
              status: true
            }); // Save Subscription
            _context2.next = 26;
            return newSubscription.save();
          case 26:
            // Add  Subscription To Parent
            ChildAccount.subscription = newSubscription._id;
            // Save Parent
            _context2.next = 29;
            return ChildAccount.save();
          case 29:
            _context2.next = 31;
            return newSubscription.populate('subscriptionType');
          case 31:
            SubscriptionDet = _context2.sent;
            // Create SubscriptionResource
            console.log(SubscriptionDet);
            SubResource = _SubscriptionResource["default"].SingleSubscription(SubscriptionDet); // Return Response
            return _context2.abrupt("return", next(_CustomSuccess["default"].createSuccess(SubResource, 'Subscription Created', 201)));
          case 37:
            _context2.prev = 37;
            _context2.t0 = _context2["catch"](0);
            console.error(_context2.t0);
          case 40:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 37]]);
  }));
  return function buySubscription(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
// Get Current User Subscription
var getCurrentUserSubscription = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var ParentAccount, SubscriptionDet, SubResource;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _ParentsModel["default"].findById(req.user._id).populate(['subscription']);
          case 3:
            ParentAccount = _context3.sent;
            if (ParentAccount.subscription) {
              _context3.next = 6;
              break;
            }
            return _context3.abrupt("return", next(_CustomError["default"].createError('No Subscription Found', 404)));
          case 6:
            _context3.next = 8;
            return ParentAccount.subscription[0].populate('subscriptionType');
          case 8:
            SubscriptionDet = _context3.sent;
            console.log(SubscriptionDet);
            // Create SubscriptionResource
            SubResource = _SubscriptionResource["default"].SingleSubscription(SubscriptionDet); // Return Response
            return _context3.abrupt("return", next(_CustomSuccess["default"].createSuccess(SubResource, 'Subscription Found', 201)));
          case 14:
            _context3.prev = 14;
            _context3.t0 = _context3["catch"](0);
            console.error(_context3.t0);
          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 14]]);
  }));
  return function getCurrentUserSubscription(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
var SubscriptionController = {
  getAllSubscriptionsType: getAllSubscriptionsType,
  buySubscription: buySubscription,
  getCurrentUserSubscription: getCurrentUserSubscription
};
var _default = SubscriptionController;
exports["default"] = _default;