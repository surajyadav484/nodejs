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

app.use((req, res, next) => {
  User.findById("627f909df4bbdf5a5d5b1b65")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://suraj:Suraj123@cluster0.yizdy.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then((result) => {
    User.findById("627f909df4bbdf5a5d5b1b65").then((user) => {
      if (!user) {
        const user = new User({
          name: "Suraj",
          email: "sky@gmail.com",
          cart: { items: [] },
        });
        user.save();
      }
    });

    app.listen(3000);
  });
