const express = require('express');    
const router = new express.Router();
const productController = require('../controllers/fashion.controller');

module.exports=app=>{
    router.post('/fashionCreate', productController.createProduct);
    router.get('/getAllFashionProducts', productController.getFashionProducts);
 
    app.use("/api",router)
    }
    
    