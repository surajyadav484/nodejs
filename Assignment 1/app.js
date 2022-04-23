const http = require("http");
const routes = require("./routes");

//spin up a node js driven server on port 3000
const server = http.createServer(routes);

server.listen(3000);
