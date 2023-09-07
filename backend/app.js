const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();
const db = require('./src/utils/db')
const passport = require('passport');
const {create} = require('express-handlebars')
const session = require('express-session');
const fs = require('fs');
const cors = require('cors')
const adminController = require("./src/controllers/adminController.js")
const homeController = require("./src/controllers/homeController.js")
const songController = require("./src/controllers/songController.js")
const artistController = require("./src/controllers/artistController.js")
const playlistController = require("./src/controllers/playlistController")  
const authController = require("./src/controllers/authController")  
const User = require("./src/models/model").User;
const { initAuth } = require("./src/utils/auth");
const { ExpressValidator } = require("express-validator");
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 8080;
//Connect to database
db.Connect();
const app = express();

//config handlebars
const hbs = create({
  layoutsDir: 'views/layouts',
	partialsDir: [
		"views/partials/",
	],
  defaultLayout: 'main.handlebars'
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
//config cookie
app.use(cookieParser());
//config session
app.use(session({
    secret: 'nodejs_52000650_52000691_520000821',
    resave: false,
    saveUninitialized: false
  }));
//config body parse
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(ExpressValidator())

//config cors
app.use(cors());
//config static folder
app.use(express.static(__dirname + '/public'))

initAuth()

app.use("/",homeController)
app.use("/home",homeController)
app.use("/auth",authController)
app.use("/manage",adminController)
app.use("/api/song",songController)
app.use("/api/artist",artistController)
app.use("/api/playlist",playlistController)

// app.use((err, req, res, next) => {
//   res.status(err.status || 500)
//   res.render('notfound')
// })
app.listen(port, ()=>{
    console.log(`Server is running on port: $(port)`);
})