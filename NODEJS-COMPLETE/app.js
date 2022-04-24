const path = require("path");
const sequelize = require("./util/database");

const Product = require("./models/product");
const User = require("./models/users");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const { user } = require("pg/lib/defaults");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

//ONE TO MANY RELATIONSHIP
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product); //This line is optional if we write above one

sequelize
  // .sync({force: true})
  .sync()
  .then((data) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Suraj", email: "sky@gmail.com" });
    }
    return user;
  })
  .then((user) => {
    console.log(user);
    app.listen(3000);
  })
  .catch((err) => console.log(err));
