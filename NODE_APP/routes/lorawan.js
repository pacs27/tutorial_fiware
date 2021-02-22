const express = require("express");
const router = express.Router();

// LORAWAN CONFIG
var ttn = require("ttn")
var appID = "cubecell_p1"
var accessKey = "ttn-account-v2.zmaiabuvbJSCbs4yB3iIU_EUpQ4IPA4gaiw-lG17afI"

// LORAWAN 
ttn.data(appID, accessKey)
  .then(function (client) {
    client.on("uplink", function (devID, payload) {
      console.log("Received uplink from ", devID)
      console.log(payload)
    })
  })
  .catch(function (error) {
    console.error("Error", error)
    process.exit(1)
  })
  
router.get("/", (req, res) => {
  res.send("Hello");
});

module.exports = router;
