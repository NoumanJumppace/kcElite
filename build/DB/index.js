"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectDB = exports.RunSeeder = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mongoose = require("mongoose");
var _dbConfig = _interopRequireDefault(require("../Config/dbConfig.js"));
var _GradeSeeder = require("./Seeder/GradeSeeder.js");
var _SubscriptionTypeSeeder = require("./Seeder/SubscriptionTypeSeeder.js");
var connectDB = function connectDB() {
  try {
    (0, _mongoose.connect)(_dbConfig["default"].db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
exports.connectDB = connectDB;
var RunSeeder = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _SubscriptionTypeSeeder.SubscriptionTypeSeeder)();
          case 3:
            _context.next = 5;
            return (0, _GradeSeeder.GradeSeeder)();
          case 5:
            console.log('Seeder Run Successfully');
            _context.next = 11;
            break;
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
  return function RunSeeder() {
    return _ref.apply(this, arguments);
  };
}();
exports.RunSeeder = RunSeeder;