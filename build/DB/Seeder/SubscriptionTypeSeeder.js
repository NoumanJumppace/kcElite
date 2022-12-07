"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubscriptionTypeSeeder = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _SubscriptionTypesModel = _interopRequireDefault(require("../Models/SubscriptionTypesModel.js"));
// Add Subscription Type by Default

// Create Subscription Type Seeder
var SubscriptionTypeSeeder = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var subscriptionTypes, subscriptionTypeArray;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _SubscriptionTypesModel["default"].find();
          case 3:
            subscriptionTypes = _context.sent;
            // Create Subscription Type Array
            subscriptionTypeArray = [{
              name: 'Basic',
              description: 'Basic Subscription',
              price: 10,
              duration: [{
                month: '1'
              }, {
                month: '6'
              }, {
                month: '12'
              }]
            }]; // Create Subscription Type
            if (!(subscriptionTypes.length === 0)) {
              _context.next = 8;
              break;
            }
            _context.next = 8;
            return _SubscriptionTypesModel["default"].insertMany(subscriptionTypeArray);
          case 8:
            _context.next = 13;
            break;
          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0);
          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));
  return function SubscriptionTypeSeeder() {
    return _ref.apply(this, arguments);
  };
}();
exports.SubscriptionTypeSeeder = SubscriptionTypeSeeder;