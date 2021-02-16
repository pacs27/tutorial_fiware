const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const exphbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const morgan = require("morgan");
const session = require("express-session");
const mongoose = require("mongoose");
const crypto = require('crypto')
const SECRET = process.env.SESSION_SECRET || crypto.randomBytes(20).toString('hex');


const app = express();

// connect mongo to session
const MongoStore = require('connect-mongo')(session)
// Define env file
dotenv.config({ path: "./config/config.env" });

//Define Mongo-DB
const MONGO_DB = process.env.MONGO_URL || "mongodb://localhost:27017";

const connectWithDB = async () => {
  try{
  const connect = await mongoose.connect(MONGO_DB + "/session", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.log(`MongoDB connected: ${connect.connection.host}:${connect.connection.port}`)
}catch(err){
  console.error(err)
  process.exit(1)
}
};

connectWithDB()
//---MIDDLEWARES----

// To allow all comunication from outside
if (process.env.NODE_ENV == "development") {
  app.use(cors());
}

// To support URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
// To parse cookies from the HTTP request
app.use(cookieParser());

app.engine(
  "hbs",
  exphbs({
    extname: ".hbs",
  })
);

app.set("view engine", "hbs");

// token
const authTokens = {};
app.use((req, res, next) => {
  // Get auth token from the cookies
  const authToken = req.cookies["AuthToken"];

  // Inject the user to the request
  req.user = authTokens[authToken];

  next();
});

// LOG HTTP REQUEST
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// SESSION CONFIG
const sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection,
})

app.use(session({
  secret: SECRET,
  resave: false,
  saveUninitialized: true,
  store:sessionStore,
  cookie:{
    maxAge: 1000 * 60 * 24 * 24 // 1 day
  }
}))


//----ROUTES-----
app.get("/", (req, res) => {
  if(req.session.username){
    res.render("home",{
      userAuth : req.session.username
    })
    }else{
      res.render("home",{
        noUser : "No User"
      })  }
  
  // res.send('hello wprld')
});
app.use("/iot", require("./routes/iot.js"));
app.use('/auth', require('./routes/auth'))
// app.use("/login", require("./routes/login"));
app.use("/register", require("./routes/register.js"));
app.use("/sensor", require('./routes/sensor'))
app.use("/lorawan", require('./routes/lorawan'))



PORT = process.env.PORT || 3000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
