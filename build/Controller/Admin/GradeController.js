"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _GradesModel = _interopRequireDefault(require("../../DB/Models/GradesModel.js"));
var _GradeResource = _interopRequireDefault(require("../../Utils/Resource/GradeResource.js"));
var _CustomError = _interopRequireDefault(require("../../Utils/ResponseHandler/CustomError.js"));
var _CustomSuccess = _interopRequireDefault(require("../../Utils/ResponseHandler/CustomSuccess.js"));
var _GradeValidator = require("../../Utils/Validator/GradeValidator.js");
// DB / Models

// Utils (Response, Error, Logger)

var addGrade = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var _GradeValidator$valid, error, name;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            // Validate the request body
            _GradeValidator$valid = _GradeValidator.GradeValidator.validate(req.body), error = _GradeValidator$valid.error;
            if (!error) {
              _context.next = 4;
              break;
            }
            throw next(_CustomError["default"].createError(error.message, 200));
          case 4:
            name = req.body.name;
            _context.next = 7;
            return _GradesModel["default"].create({
              name: name
            });
          case 7:
            return _context.abrupt("return", next(_CustomSuccess["default"].createSuccess({}, 'Grade Added Successfully', 200)));
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
  return function addGrade(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var getGrades = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var grades, newGradesResource;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _GradesModel["default"].find().sort({
              name: 1
            });
          case 3:
            grades = _context2.sent;
            newGradesResource = grades.map(function (grade) {
              return new _GradeResource["default"](grade);
            });
            return _context2.abrupt("return", next(_CustomSuccess["default"].createSuccess(newGradesResource, 'All Grades', 200)));
          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            console.error(_context2.t0);
          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return function getGrades(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var updateGrade = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var _GradeValidator$valid2, error, name, id;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _GradeValidator$valid2 = _GradeValidator.GradeValidator.validate(req.body), error = _GradeValidator$valid2.error;
            if (!error) {
              _context3.next = 4;
              break;
            }
            throw next(_CustomError["default"].createError(error.message, 200));
          case 4:
            name = req.body.name;
            id = req.params.id;
            _context3.next = 8;
            return _GradesModel["default"].findByIdAndUpdate(id, {
              name: name
            });
          case 8:
            return _context3.abrupt("return", next(_CustomSuccess["default"].createSuccess({}, 'Grade Updated Successfully', 200)));
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
  return function updateGrade(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
var DeleteGrade = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var id;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            id = req.params.id;
            _context4.next = 4;
            return _GradesModel["default"].findByIdAndDelete(id);
          case 4:
            return _context4.abrupt("return", next(_CustomSuccess["default"].createSuccess({}, 'Grade Deleted Successfully', 200)));
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
  return function DeleteGrade(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();
var GradeController = {
  addGrade: addGrade,
  getGrades: getGrades,
  updateGrade: updateGrade,
  DeleteGrade: DeleteGrade
};
var _default = GradeController;
exports["default"] = _default;