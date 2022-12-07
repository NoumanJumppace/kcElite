"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var videoSchema = new _mongoose["default"].Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  video_url: {
    type: String,
    required: true
  },
  thumbnail_url: {
    type: String,
    required: true
  },
  // Reference to the Grade Model
  grade: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Grade'
  },
  // Reference to the VideoCategory Model
  category: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'VideoCategory'
  }
}, {
  timestamps: true
});
var VideoModel = _mongoose["default"].model('video', videoSchema);
var _default = VideoModel;
exports["default"] = _default;