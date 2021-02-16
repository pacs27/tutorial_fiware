const express = require("express");
const router = express.Router();


// Whenever a subscription is received, display it on the monitor
// and notify any interested parties using Socket.io
router.post('/humidity-change', (req, res) => {
    console.log(`Subcription id = ${req.body.subscriptionId}`)
    console.log("Data = ",JSON.stringify(req.body.data) )
    // res.json(req.body.data)
});

// Just for test
router.post('/humidity-chang', (req, res) => {
    console.log(req)
   //return res.json(req.body);
   return res.status(200).send("urn:ngsi-ld:Pump:001@start|start OK");
    //res.json(req.body.data)
});



// Just for test
router.post('/door', (req, res) => {
    // const keyValuePairs = req.body    // return res.status(200).send(result + 'OK');
    console.log(req)
    return res.status(200).send("urn:ngsi-ld:Door:001@close|close OK");
});

router.post('/door', (req, res) => {
    // const keyValuePairs = req.body    // return res.status(200).send(result + 'OK');
    console.log(req)
    return res.status(200).send("urn:ngsi-ld:Door:001@close|close OK");
});


router.get('/price-change', (req,res)=>{
    res.send("<h1>Subscription page</h1>")

})

module.exports = router