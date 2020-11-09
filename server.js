require("dotenv").config();

const express = require("express")
const session = require('express-session')
const bodyParser = require("body-parser")
const dotenv = require('dotenv')
const mongoose = require("mongoose")
const morgan = require("morgan")
const cookieParser = require('cookie-parser')
const bcrypt = require("bcryptjs")
const MongoStore = require('connect-mongo')(session)
const path = require("path")
const cors = require("cors");
const app = express()

// mongoose
//     .connect(process.env.MONGODB_URI, {
//         keepAlive: true,
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     })
//     .then(response => {
//         console.log(
//             `Connected to Mongo! Database name: "${response.connections[0].name}"`
//         );
//     })
//     .catch(err => {
//         console.log("error connecting to mongo", err);
//     })

// app.listen(4000, () => {
//     console.log("app is runing on port 4000");
// }) --->para uso local

app.listen(process.env.PORT || 4000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
})

app.use(cors({
    credentials: true,
    origin: [process.env.PUBLIC_DOMAIN]
})
)

app.use(bodyParser.json()) //------> when sending data from the fronteNd and we are using json() we need to parse it, and for that we use the bodyparser.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use(
//     session({
//         secret: process.env.SECRET_SESSION,
//         cookie: {
//             maxAge: 6000000,
//         },
//         resave: false,
//         saveUninitialized: true,
//         store: new MongoStore({
//             mongooseConnection: mongoose.connection,
//             ttl: 24 * 60 * 60 * 1000, // 1 day
//         }),
//     })
// );

app.get("/", (req, res, next) => {
    res.json("its working")
})

// const auth = require("./routes/auth");

// app.use("/", auth)

