const express = require ('express');
const app = express ();
const bodyparser = require ('body-parser');
const db = require ('./models');
const cors = require ('cors');
const session = require('express-session');
require('dotenv').config();

app.use (cors ());

/////////////////////

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET 
}));

app.set('view engine', 'ejs');

//////////////////////
const port = process.env.PORT || 8085;
app.use (bodyparser.urlencoded ({extended: false}));
app.use (bodyparser.json ());

db.mongoose
  .connect (db.url)
  .then (() => {
    console.log ('connected to mongodb Atlas server');
  })
  .catch (err => {
    console.log ('server is not connected ', err);
    // res.status(500).json({err:err.message || 'server is not connected'})

  });

require ('./routes/user.routes') (app);
require ('./routes/product.routes') (app);

app.listen (port, () => {
  console.log ('server is running');
});
