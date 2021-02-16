const express = require("express");
const router = express.Router();



router.post('/pump001',(req, res) => {
    console.log(`Body = ${JSON.stringify(req.body)}`)
    //console.log(req)
   return res.status(200).send("pump001@start|start OK");
  });
  
module.exports = router