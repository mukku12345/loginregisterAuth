const db = require ('../models');
const Product = db.products.Product;
const User = db.auth.User;

exports.createProduct = async (req, res) => {
  try {
    const {name, quality, quantity, price, sex, color, size, images} = req.body;

    const newProduct = new Product ({
      name,
      quality,
      quantity,
      price,
      sex,
      color,
      size,
      images,
      
    });

    await newProduct.save ();

    res.status (200).json ({
      status_code: '200',
      data: newProduct,
    });
  } catch (error) {
    res.status (500).json ({
      message: error.message || 'Some error occurred while creating the user.',
    });
  }
};
exports.getFashionProducts = async (req, res) => {
  try {
    // const product = await Product.find ({}).populate ({path: 'userId'});
    const product = await Product.find ({});


    res.status (200).json ({
      status: '200',
      data: product,
    });
  } catch (error) {
    res.status (500).json ({
      message: error.message || 'Some error occurred while creating the user.',
    });
  }
};
