"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _morgan = _interopRequireDefault(require("morgan"));
var _morganBody = _interopRequireDefault(require("morgan-body"));
var _index = require("./DB/index.js");
var _UserRouters = require("./Router/User/UserRouters.js");
var _OtpRouters = require("./Router/Auth/OtpRouters.js");
var _SubscriptionRouter = require("./Router/User/SubscriptionRouter.js");
var _GradeRouter = require("./Router/Admin/GradeRouter.js");
var _ResponseHandler = require("./Utils/ResponseHandler/ResponseHandler.js");
var _SubscripRouter = require("./Router/Admin/SubscripRouter.js");
var _AuthRouters = require("./Router/Auth/AuthRouters.js");
var _VideoCatagoryRouter = require("./Router/Admin/VideoCatagoryRouter.js");
var _VideoRouter = require("./Router/Admin/VideoRouter.js");
// Librarys

// import path from 'path'
// import { fileURLToPath } from 'url'
// DB Connection

// Routes

// Response Handler

// export const filename = fileURLToPath(import.meta.url)
// export const dirname = path.dirname(filename)

var app = (0, _express["default"])();
exports.app = app;
var API_PreFix = '/api/v1';
var API_PreFix_Admin = '/api/v1/admin';
app.use('src/Uploads', _express["default"]["static"](__dirname + '/Uploads'));
var corsOptions = {
  origin: '*'
};
app.use((0, _cors["default"])(corsOptions));
app.use(_bodyParser["default"].json());
// Configure bodyparser to handle post requests
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use((0, _morgan["default"])('tiny'));
(0, _morganBody["default"])(app, {
  prettify: true,
  logReqUserAgent: true,
  logReqDateTime: true
});
// Connect To Database
(0, _index.connectDB)();
// Running Seeder
(0, _index.RunSeeder)();
app.get('/', function (req, res) {
  res.json({
    message: 'Welcome to the application.'
  });
});
// API Routes
// Auth Routes
app.use(API_PreFix, _AuthRouters.AuthRouters);

// User Routes
app.use(API_PreFix, _UserRouters.UserRouters);
app.use(API_PreFix, _OtpRouters.OtpRouters);
app.use(API_PreFix, _SubscriptionRouter.SubscriptionRouter);
// Admin Routes
app.use(API_PreFix_Admin, _GradeRouter.GradeRouter);
app.use(API_PreFix_Admin, _SubscripRouter.SubscripRouter);
app.use(API_PreFix_Admin, _VideoCatagoryRouter.VideoCatagoryRouter);
app.use(API_PreFix_Admin, _VideoRouter.VideoRouter);
app.use(_ResponseHandler.ResHandler);