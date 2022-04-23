const express = require("express");
const path = require("path");
const router = express.Router();

const rootDir = require("../utils/path");

const userData = [];

router.post("/users", (req, res) => {
  userData.push({ username: req.body.username });
  res.render("users", { pageTitle: "Users Page", userData });
});

router.get("/", (req, res) => {
  res.render("home", { pageTitle: "Home page" });
});

exports.router = router;
