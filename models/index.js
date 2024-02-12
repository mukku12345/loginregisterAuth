const dbConfig = require("../config/db.config")

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};
 db.mongoose = mongoose;
 db.url = dbConfig.url;
 db.auth = require("./user.model")(mongoose);
 db.products = require("./fashion.model")(mongoose);


 module.exports=db;

 