const handleRequest = (req, res) => {
  const { url, method } = req;
  if (url === "/") {
    res.write("<html><body>");
    res.write("<h1>Welcome to my site</h1>");
    res.write(
      '<form action="/create-user" method="POST"><input type="text" name="username"> <button type="submit">Submit</button> </form>'
    );

    res.write("</body></html>");
    res.end();
  }
  if (url === "/users") {
    res.write("<html><body>");
    res.write("<ul><li>User1</li>");
    res.write("<li>User2</li>");
    res.write("<li>User3</li>");
    res.write("<li>User4</li>");
    res.write("<li>User5</li></ul>");
    res.write("</body></html>");
    res.end();
  }
  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedData = Buffer.concat(body).toString();
      console.log(parsedData.split("=")[1]);
    });
    res.statusCode = 302;
    res.setHeader("Location", "/");
    res.end();
  }
};

module.exports = handleRequest;
