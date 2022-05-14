const path = require("path");

// const mongoConnect = require("./util/database").MongoClient;
const mongoose = require("mongoose");

const User = require("./models/users");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
// const { user } = require("pg/lib/defaults");
// const req = require("express/lib/request");
// const { use } = require("express/lib/router");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// app.use((req, res, next) => {
//   User.findUserById("6275fc269f1edd2312f322da")
//     .then((user) => {
//       req.user = new User(user.username, user.email, user.cart, user._id);
//       next();
//     })
//     .catch((err) => console.log(err));
// });

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://suraj:Suraj123@cluster0.yizdy.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(3000);
  });
