const express = require("express");
const router = express.Router();
const { pdpAuthentication, authorizeBasicPDP } = require("../auth/fiware-auth");

// @desc Authorization level 1: Allow all action to every signed user
// @route /sensor/level1
router.get("/level1", pdpAuthentication, (req, res) => {
  if (!res.locals.authorized) {
    console.log("Error: Access Denied");
    res.redirect("/");
  } else {
    res.render("sensor-level1", {
      userAuth: req.session.username,
    });
  }
});

// @desc Authorization level 2: Allow all action to every signed user
// @route /sensor/level2
router.get("/level2", authorizeBasicPDP, (req, res) => {
  if (!res.locals.authorized) {
    console.log("Error: Access Denied");
    res.redirect("/");
  } else {
    res.render("sensor-level2", {
      userAuth: req.session.username,
    });
  }
});

module.exports = router;
