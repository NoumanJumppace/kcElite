"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _SubscriptionTypesModel = _interopRequireDefault(require("../../DB/Models/SubscriptionTypesModel.js"));
var _SubscriptionTypeResource = _interopRequireDefault(require("../../Utils/Resource/SubscriptionTypeResource.js"));
var _CustomError = _interopRequireDefault(require("../../Utils/ResponseHandler/CustomError.js"));
var _CustomSuccess = _interopRequireDefault(require("../../Utils/ResponseHandler/CustomSuccess.js"));
var _SubscriptionValidator = require("../../Utils/Validator/SubscriptionValidator.js");
// DB / Models

// Utils (Response, Error, Logger)

var getSubscriptions = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var subscriptions, newSubscriptionsResource;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _SubscriptionTypesModel["default"].find().sort({
              name: 1
            });
          case 3:
            subscriptions = _context.sent;
            // Create Subscription Type Resource
            newSubscriptionsResource = subscriptions.map(function (subscription) {
              return _SubscriptionTypeResource["default"].SingleSubscription(subscription);
            });
            return _context.abrupt("return", next(_CustomSuccess["default"].createSuccess(newSubscriptionsResource, 'All Subscriptions', 200)));
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
  return function getSubscriptions(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var addSubscription = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var _addSubscriptionValid, error, _req$body, name, description, price, duration;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _addSubscriptionValid = _SubscriptionValidator.addSubscriptionValidator.validate(req.body), error = _addSubscriptionValid.error;
            if (!error) {
              _context2.next = 4;
              break;
            }
            throw next(_CustomError["default"].createError(error.message, 200));
          case 4:
            _req$body = req.body, name = _req$body.name, description = _req$body.description, price = _req$body.price, duration = _req$body.duration;
            _context2.next = 7;
            return _SubscriptionTypesModel["default"].create({
              name: name,
              description: description,
              price: price,
              duration: duration
            });
          case 7:
            return _context2.abrupt("return", next(_CustomSuccess["default"].createSuccess({}, 'Subscription Added Successfully', 200)));
          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            console.error(_context2.t0);
          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 10]]);
  }));
  return function addSubscription(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var updateSubscription = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var _addSubscriptionValid2, error, _req$body2, name, description, price, duration, id;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _addSubscriptionValid2 = _SubscriptionValidator.addSubscriptionValidator.validate(req.body), error = _addSubscriptionValid2.error;
            if (!error) {
              _context3.next = 4;
              break;
            }
            throw next(_CustomError["default"].createError(error.message, 200));
          case 4:
            _req$body2 = req.body, name = _req$body2.name, description = _req$body2.description, price = _req$body2.price, duration = _req$body2.duration;
            id = req.params.id;
            _context3.next = 8;
            return _SubscriptionTypesModel["default"].findByIdAndUpdate(id, {
              name: name,
              description: description,
              price: price,
              duration: duration
            });
          case 8:
            return _context3.abrupt("return", next(_CustomSuccess["default"].createSuccess({}, 'Subscription Updated Successfully', 200)));
          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](0);
            console.error(_context3.t0);
          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 11]]);
  }));
  return function updateSubscription(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
var DeleteSubscription = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var id;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            id = req.params.id;
            _context4.next = 4;
            return _SubscriptionTypesModel["default"].findByIdAndDelete(id);
          case 4:
            return _context4.abrupt("return", next(_CustomSuccess["default"].createSuccess({}, 'Subscription Deleted Successfully', 200)));
          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            console.error(_context4.t0);
          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));
  return function DeleteSubscription(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();
var SubscripController = {
  getSubscriptions: getSubscriptions,
  addSubscription: addSubscription,
  updateSubscription: updateSubscription,
  DeleteSubscription: DeleteSubscription
};
var _default = SubscripController;
exports["default"] = _default;