const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser("secretcode"));

// access the cookie here
app.get("/", (req, res) => {
  console.log(req.cookies);
  console.log("The Signed Cookies are ", req.signedCookies);
  res.send("This is the Home Page");
});

// from the server sending the cookie
app.get("/getCookie", (req, res) => {
  // name value pairs stored in cookies
  res.cookie("name", "Aakash");
  res.send("Atluntadhi Cookies thoni");
});

// Signed Cookies => a bit of safer and unchangeable data will be in encrypted format
app.get("/getSignedCookie", (req, res) => {
  res.cookie("color", "orange", { signed: true });
  res.send("Signed Cookies Story");
});

app.listen(3000, () => {
  console.log("Server is running at port Number 3000");
});
