"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _VideoCategoryModel = _interopRequireDefault(require("../../DB/Models/VideoCategoryModel.js"));
var _VideoCatagory = _interopRequireDefault(require("../../Utils/Resource/VideoCatagory.js"));
var _CustomError = _interopRequireDefault(require("../../Utils/ResponseHandler/CustomError.js"));
var _CustomSuccess = _interopRequireDefault(require("../../Utils/ResponseHandler/CustomSuccess.js"));
var _VideoCatagoryValidator = require("../../Utils/Validator/VideoCatagoryValidator.js");
// DB / Model

// Utils (Response, Error, Logger)

var getVideoCatagory = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var videoCatagory, newVideoCatagoryResource;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _VideoCategoryModel["default"].find();
          case 3:
            videoCatagory = _context.sent;
            newVideoCatagoryResource = videoCatagory.map(function (videoCatagory) {
              return new _VideoCatagory["default"](videoCatagory);
            });
            return _context.abrupt("return", next(_CustomSuccess["default"].createSuccess(newVideoCatagoryResource, 'All Video Catagory', 200)));
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
  return function getVideoCatagory(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var addVideoCatagory = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var _VideoCatagoryValidat, error, _req$body, name, description, videoCata, newVideoCatagoryResource;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _VideoCatagoryValidat = _VideoCatagoryValidator.VideoCatagoryValidator.validate(req.body), error = _VideoCatagoryValidat.error;
            if (!error) {
              _context2.next = 4;
              break;
            }
            throw next(_CustomError["default"].createError(error.message, 200));
          case 4:
            _req$body = req.body, name = _req$body.name, description = _req$body.description;
            _context2.next = 7;
            return _VideoCategoryModel["default"].create({
              name: name,
              description: description
            });
          case 7:
            videoCata = _context2.sent;
            newVideoCatagoryResource = new _VideoCatagory["default"](videoCata);
            return _context2.abrupt("return", next(_CustomSuccess["default"].createSuccess(newVideoCatagoryResource, 'Video Catagory Added Successfully', 200)));
          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](0);
            console.error(_context2.t0);
          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 12]]);
  }));
  return function addVideoCatagory(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var updateVideoCatagory = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var _VideoCatagoryValidat2, error, _req$body2, name, description, id;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _VideoCatagoryValidat2 = _VideoCatagoryValidator.VideoCatagoryValidator.validate(req.body), error = _VideoCatagoryValidat2.error;
            if (!error) {
              _context3.next = 4;
              break;
            }
            throw next(_CustomError["default"].createError(error.message, 200));
          case 4:
            _req$body2 = req.body, name = _req$body2.name, description = _req$body2.description;
            id = req.params.id;
            _context3.next = 8;
            return _VideoCategoryModel["default"].findByIdAndUpdate(id, {
              name: name,
              description: description
            });
          case 8:
            return _context3.abrupt("return", next(_CustomSuccess["default"].createSuccess({}, 'Video Catagory Updated Successfully', 200)));
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
  return function updateVideoCatagory(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
var DeleteVideoCatagory = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var id;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            id = req.params.id;
            _context4.next = 4;
            return _VideoCategoryModel["default"].findByIdAndDelete(id);
          case 4:
            return _context4.abrupt("return", next(_CustomSuccess["default"].createSuccess({}, 'Video Catagory Deleted Successfully', 200)));
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
  return function DeleteVideoCatagory(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();
var VideoCatagoryController = {
  getVideoCatagory: getVideoCatagory,
  addVideoCatagory: addVideoCatagory,
  updateVideoCatagory: updateVideoCatagory,
  DeleteVideoCatagory: DeleteVideoCatagory
};
var _default = VideoCatagoryController;
exports["default"] = _default;