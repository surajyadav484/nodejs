const express = require("express");
const app = express();

app.use("/user", (req, res, next) => {
  console.log("Users page");
  //   next();
  res.send("<li>user 1</l1><li>user 2</l1><li>user 3</l1><li>user 4</l1>");
});
app.use("/", (req, res, next) => {
  res.send("<h1>Welcome to Home page</h1>");
});
app.listen(3000);
