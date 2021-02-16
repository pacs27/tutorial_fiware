const OAuth2 = require("../lib/oauth2").OAuth2;
const keyrockPort = process.env.KEYROCK_PORT || "3005";
const keyrockUrl =
  (process.env.KEYROCK_URL || "http://localhost") + ":" + keyrockPort;
const keyrockIPAddress =
  (process.env.KEYROCK_IP_ADDRESS || "http://127.0.0.1") + ":" + keyrockPort;
const clientId =
  process.env.KEYROCK_CLIENT_ID 
const clientSecret =
  process.env.KEYROCK_CLIENT_SECRET 
const callbackURL =
  process.env.CALLBACK_URL || "http://192.168.1.67:3000/login";

// Creates oauth library object with the config data
const oa = new OAuth2(
  clientId,
  clientSecret,
  keyrockUrl,
  keyrockIPAddress,
  "/oauth2/authorize",
  "/oauth2/token",
  callbackURL
);


// @desc This function consult the user credential in an especific app
// Take email and password parameters
function userCredentialGrant(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  console.log("Client id = ",process.env.KEYROCK_CLIENT_ID)
  oa.getOAuthPasswordCredentials(email, password)
    .then((results) => {
      //   logAccessToken(req, results.access_token);
      console.log("Result: ", results);
      req.session.access_token = results.access_token;
      return getUserFromAccessToken(req, results.access_token);
    })
    .then((user) => {
      console.log("The user is = ", user);
      req.session.username = user.username;
      return res.redirect("/");
    })
    .catch((err) => {
      console.error(err);
    });
}

// This function get the user data with the token
function getUserFromAccessToken(req, accessToken) {
  return new Promise(function (resolve, reject) {
    oa.get(keyrockIPAddress + "/user", accessToken)
      .then((response) => {
        const user = JSON.parse(response);
        return resolve(user);
      })
      .catch((error) => {
        return console.log("error = ", error);
      });
  });
}

// @desc Check if token is valid.
// Authorization level 1

function pdpAuthentication(req, res, next) {
  const keyrockUserUrl =
    keyrockIPAddress +
    "/user" +
    "?access_token=" +
    req.session.access_token +
    "&app_id=" +
    clientId;
  return oa
    .get(keyrockUserUrl)
    .then((response) => {
      res.locals.authorized = true;
      return next();
    })
    .catch((error) => {
      console.error("Error = ", error);
      res.locals.authorized = false;
      return next()
    });
}

// Use of Keyrock as a PDP (Policy Decision Point)
// LEVEL 2: BASIC AUTHORIZATION - Resources are accessible on a User/Verb/Resource basis
// The url start in the same folder (level2 instead sensor/level2)
function authorizeBasicPDP(req, res, next, resource = req.url) {
  console.log("Try level 2 auth")
  // console.log("result = ",req.method, req.url)

  // Using the access token asks the IDM for the user info

  const keyrockUserUrl =
      keyrockIPAddress +
      '/user' +
      '?access_token=' +
      req.session.access_token +
      '&app_id=' +
      clientId +
      '&action=' +
      req.method +
      '&resource=' +
      resource;

  return oa
      .get(keyrockUserUrl)
      .then((response) => {
          const user = JSON.parse(response);
          // console.log("User = ", user)
          res.locals.authorized = user.authorization_decision === 'Permit';
          return next();
      })
      .catch((error) => {
        console.error(error)
        res.locals.authorized = false;
          return next();
      });
}


// @desc Handle logout requests to remove access_token from the session cookie
function logOut(req, res) {
  console.log("success", req.session.username + " logged out");
  req.session.access_token = undefined;
  req.session.refresh_token = undefined;
  req.session.username = undefined;
  return res.redirect("/");
}

module.exports = {
  userCredentialGrant,
  getUserFromAccessToken,
  pdpAuthentication,
  logOut,
  authorizeBasicPDP
};
