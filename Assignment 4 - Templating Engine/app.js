const bodyParser = require("body-parser");

const routes = require("./routes/routes");

const ejs = require("ejs");

const express = require("express");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", "views");
app.use(routes.router);

app.listen(3000);
