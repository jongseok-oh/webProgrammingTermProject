const express = require("express");
//const home = require("/routes/home");
const main = require("./routes/main");
const home = require("./routes/home");
const mobile = require("./routes/mobile");
const app = express();
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");

app.use("/img", express.static("./container/img"));
app.use("/css", express.static("./container/css"));
app.use("/script", express.static("./container/script"));

app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true,
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(cookieParser());
app.use("/", express.static(path.join(__dirname, "/")));
app.use(express.urlencoded({ extended: false }));

app.use("/", main);
app.use("/home", home);
app.use("/mobile", mobile);

app.listen(4000, () => console.log("listening on port 4000"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

//error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development

  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
  console.log("에러뜸 ㅠ");
});

module.exports = app;
