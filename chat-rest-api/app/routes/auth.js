const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");

const CLIENT_URL = "http://localhost:3000/login";

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();

  // res.redirect(CLIENT_URL);
});

//GOOGLE AUTHENTICATION
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

//ON GOOGLE AUTHENTICATION SUCCESS REDIRECT TO CLIENT_URL
//  "http://localhost:5000/auth/google/callback" is saved to google 0Auth ClientID credentials
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

//GITHUB AUTHENTICATION
router.get("/github", passport.authenticate("github", { scope: ["profile"] }));
router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

//FACEBOOK AUTHENTICATION
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["profile"] })
);
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

//REGISTER
router.post("/register", async (req, res) => {
  try {
    //GENERATE NEW PASSWORD USING BCRYPT
    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(req.body.password, salt);

    //CREATE NEW USER
    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hasedPassword,
    });
    console.log("newUser", newUser);
    //SAVE USER AND RETURN RESPONSE
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    console.log("user", user);
    !user && res.send(404).json("User not found");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    console.log("validPassword", validPassword);
    !validPassword && res.send(404).json("Incorrect Password");
    if (user && validPassword) {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
