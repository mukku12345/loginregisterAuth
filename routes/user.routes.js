const passport = require("passport");
const express = require("express");
const router = new express.Router();
require("../passport");
const AuthController = require("../controllers/user.controller");
const verifyToken = require("../middleware/authMiddleware");


router.use(passport.initialize());
router.use(passport.session());
module.exports = (app) => {
  router.post("/signUp", AuthController.registerUser);
  router.post("/signIn", AuthController.signIn);
  router.get("/userlists", verifyToken, AuthController.getUserList);
  router.post("/signOut", verifyToken, AuthController.signOut);
  router.get("/", AuthController.loadAuth);

  // Auth
  router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
  );

  // Auth Callback

  router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: "/success",
      failureRedirect: "/failure",
    })
  );

  // Success
  router.get("/success", AuthController.successGoogleLogin);

  // failure
  router.get("/failure", AuthController.failureGoogleLogin);

  app.use("/", router);
};
