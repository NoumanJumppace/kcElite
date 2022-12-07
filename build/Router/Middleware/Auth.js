"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthMiddleware = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _CustomError = _interopRequireDefault(require("../../Utils/ResponseHandler/CustomError.js"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _ParentsModel = _interopRequireDefault(require("../../DB/Models/ParentsModel.js"));
var _ChildModel = _interopRequireDefault(require("../../DB/Models/ChildModel.js"));
var AuthMiddleware = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var AuthHeader, parts, _parts, scheme, token;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            AuthHeader = req.headers.authorization || req.body.token || req.query.token || req.headers['x-access-token'];
            if (AuthHeader) {
              _context2.next = 3;
              break;
            }
            return _context2.abrupt("return", next(_CustomError["default"].unauthorized()));
          case 3:
            parts = AuthHeader.split(' ');
            _context2.prev = 4;
            if (!(parts.length !== 2)) {
              _context2.next = 7;
              break;
            }
            return _context2.abrupt("return", next(_CustomError["default"].unauthorized()));
          case 7:
            _parts = (0, _slicedToArray2["default"])(parts, 2), scheme = _parts[0], token = _parts[1];
            if (/^Bearer$/i.test(scheme)) {
              _context2.next = 10;
              break;
            }
            return _context2.abrupt("return", next(_CustomError["default"].unauthorized()));
          case 10:
            _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET, /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(err, decoded) {
                var isParentExist, isChildExist;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (!err) {
                          _context.next = 6;
                          break;
                        }
                        if (!(err.name === 'TokenExpiredError')) {
                          _context.next = 5;
                          break;
                        }
                        return _context.abrupt("return", next(_CustomError["default"].createError('Token Expired', 401)));
                      case 5:
                        return _context.abrupt("return", next(_CustomError["default"].createError('Inviald Token', 401)));
                      case 6:
                        _context.next = 8;
                        return _ParentsModel["default"].findOne({
                          _id: decoded.payload._id
                        });
                      case 8:
                        isParentExist = _context.sent;
                        _context.next = 11;
                        return _ChildModel["default"].findOne({
                          _id: decoded.payload._id
                        });
                      case 11:
                        isChildExist = _context.sent;
                        if (!(!isParentExist && !isChildExist)) {
                          _context.next = 14;
                          break;
                        }
                        return _context.abrupt("return", next(_CustomError["default"].unauthorized()));
                      case 14:
                        if (isParentExist) {
                          req.user = isParentExist;
                        }
                        if (isChildExist) {
                          req.user = isChildExist;
                        }
                        req.token = token;
                        return _context.abrupt("return", next());
                      case 18:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));
              return function (_x4, _x5) {
                return _ref2.apply(this, arguments);
              };
            }());
            _context2.next = 16;
            break;
          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](4);
            return _context2.abrupt("return", next(_CustomError["default"].unauthorized()));
          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[4, 13]]);
  }));
  return function AuthMiddleware(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
exports.AuthMiddleware = AuthMiddleware;