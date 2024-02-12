const { isObjectIdOrHexString } = require("mongoose");

const mongoose = require("mongoose");
module.exports = (mongoose) => {
  const product = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    quality: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    }, 
    price: {
      type: Number,
      required: true,
    },
    sex: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    images:{
     type:Array,
     required:true
    },
    purchased: {
      type: Boolean,
      default: false,
    },
    uploadedAt: {
      type: Date,
      default: Date.now(),
    },
    // userId: { 
    //   type: mongoose.Schema.Types.ObjectId, 
    //   ref: 'User', 
    //   required: true, 
    // },
  });

  const Product = mongoose.model("Product", product);

  return { Product };
};
