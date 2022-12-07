"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _http = require("http");
var _appsub = require("./appsub.js");
var httpServer = (0, _http.createServer)(_appsub.app);
var port = process.env.PORT || 3050;
httpServer.listen(port, /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log('Server listening on port ' + port);
        case 1:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));