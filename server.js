const express = require("express");

const app = express();
const session = require("express-session");

const flash = require("connect-flash");

app.set("view engine", "ejs");

app.use(
  session({
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.failure = req.flash("failure");
  next();
});

app.get("/getName", (req, res) => {
  const { name = "Anonymous" } = req.query;
  req.session.name = name;
  if (name !== "Anonymous")
    req.flash("success", "User Registered Successfully");
  else req.flash("failure", "User Not Registered ");
  res.send(`Heyy this is ${name}`);
});

app.get("/text", (req, res) => {
  res.send(`This text is from ${req.session.name}`);
  // res.send("Test is Successful");
});

app.get("/register", (req, res) => {
  res.render("index.ejs", {
    name: req.session.name,
    // msg: req.flash("success"),
  });
});

app.get("/count", (req, res) => {
  if (req.session.count) {
    ++req.session.count;
  } else {
    req.session.count = 1;
  }
  res.send(`The Count you visited is : ${req.session.count} `);
});

app.listen(3000, () => {
  console.log("Listening to Port 3000");
});
