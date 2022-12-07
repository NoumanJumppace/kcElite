"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _moment = _interopRequireDefault(require("moment"));
// Create SubscriptionTypeResource class For Response
var VideoResource = /*#__PURE__*/(0, _createClass2["default"])(function VideoResource(Video) {
  (0, _classCallCheck2["default"])(this, VideoResource);
  this.id = Video._id;
  this.title = Video.title;
  // Add Server URL to video_url and thumbnail_url
  this.video_url = process.env.SERVER_URL + Video.video_url;
  this.thumbnail_url = process.env.SERVER_URL + Video.thumbnail_url;
  this.createdAt = (0, _moment["default"])(Video.createdAt).format('YYYY-MM-DD HH:mm:ss');
});
var _default = VideoResource;
exports["default"] = _default;