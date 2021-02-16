const request = require("request");

const options = {
    method: "GET",
    url: "http://localhost:1026/v2/entities/urn:ngsi-ld:Parcel:001",
    qs: { options: "keyValues" }
};

request(options, function(error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
});
