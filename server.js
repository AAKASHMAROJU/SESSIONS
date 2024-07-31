const express = require("express");

const app = express();

const session = require("express-session");

app.use(session({ secret: "mysupersecretseting" }));

app.get("/text", (req, res) => {
  res.send("Test is Successful");
});

app.listen(3000, () => {
  console.log("Listening to Port 3000");
});
