require("./database/db");
require("dotenv").config();
const redisStore = require("./redis/redisStore");
const cors = require("cors");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");
var indexRouter = require("./routes/index");

//console.log(model)
const app = express();
app.use(cookieParser());
const allowedOrigins = [
  "http://api.app.localhost:5173",
  "http://api.app.localhost:3000/protected",
  "http://api.app.localhost:5173/login",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// app.use(
//   session({
//     store: redisStore,
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: false, // if true only transmit cookie over https
//       httpOnly: false, // if true prevent client side JS from reading the cookie
//       maxAge: 1000 * 60 * 10, // * 15, // session max age in miliseconds
//     },
//   })
// );
async function testCookies() {
  //console.log(session);
  //example of encoded cookie string
  // const encodedVal =
  //   "s%3AzKnVzZUSoyVMTEl126w8MOhlanvlLdXX.xb%2BQA%2BzKgV%2Bn8nFVlKRLTeEiXzo9djm6WQ9XCt0MtHM";
  // const decodedVal =
  //   "s:zKnVzZUSoyVMTEl126w8MOhlanvlLdXX.xb+QA+zKgV+n8nFVlKRLTeEiXzo9djm6WQ9XCt0MtHM";
  // console.log(decodeURIComponent(encodedVal) === decodedVal);
  // console.log(decodedVal);
}
//console.log(testCookies());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("trust proxy", 1); // trust first proxy

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
