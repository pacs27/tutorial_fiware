const express = require("express");
const router = express.Router();
const request = require('request');

const crateUrl = 'http://localhost:4200/_sql';

function readCrateSoilHumidity(id, aggMethod) {
    // debug('readCrateLampLuminosity');
    return new Promise(function(resolve, reject) {
        const sqlStatement =
            "SELECT DATE_FORMAT (DATE_TRUNC ('minute', time_index)) AS minute, " +
            aggMethod +
            '(humidity) AS ' +
            aggMethod +
            " FROM mtrabanales.etsoilhumidity WHERE entity_id = 'SoilHumidity:" +
            id +
            "' GROUP BY minute ORDER BY minute";
        const options = {
            method: 'POST',
            url: crateUrl,
            headers: { 'Content-Type': 'application/json' },
            body: { stmt: sqlStatement },
            json: true
        };
        request(options, (error, response, body) => {
            return error ? reject(error) : resolve(body);
         });
    });
}


router.get('/soilHumidity001', async (req, res) => {
    try{
        console.log('start')
    const crateLampMinData = await readCrateSoilHumidity(001, 'min');
    console.log(crateLampMinData)
    }catch(err){
        console.error(err)
    }
  });
  
module.exports = router