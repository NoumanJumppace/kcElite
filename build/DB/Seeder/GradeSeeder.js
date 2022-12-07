"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GradeSeeder = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _GradesModel = _interopRequireDefault(require("../Models/GradesModel.js"));
var GradeSeeder = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var grades, gradeArray;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _GradesModel["default"].find();
          case 3:
            grades = _context.sent;
            // Create Grade Array
            gradeArray = [{
              name: '1'
            }, {
              name: '2'
            }, {
              name: '3'
            }, {
              name: '4'
            }, {
              name: '5'
            }, {
              name: '6'
            }]; // Create Grade
            if (!(grades.length === 0)) {
              _context.next = 8;
              break;
            }
            _context.next = 8;
            return _GradesModel["default"].insertMany(gradeArray);
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
  return function GradeSeeder() {
    return _ref.apply(this, arguments);
  };
}();
exports.GradeSeeder = GradeSeeder;