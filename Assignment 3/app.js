const router = require("./routes/routes");
const path = require("path");
const express = require("express");
const app = express();

app.use(router);
app.use(express.static(path.join(__dirname, "public")));
app.listen(3000);
