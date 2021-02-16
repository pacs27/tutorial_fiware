// Midleware for Iot-agent

// This function gets the request body
function rawBody(req, res, next) {
    req.setEncoding("utf8");
    req.body = "";
    req.on("data", function (chunk) {
      req.body += chunk;
      // console.log(`Chunck = ${chunk}`)
    });
    req.on("end", function () {
      next();
    });
  }

module.exports = rawBody