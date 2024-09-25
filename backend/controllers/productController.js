// controllers/productController.js
const Product = require('../models/productModel');

// שליפת כל המוצרים מהדאטה בייס
exports.getAllProducts = async (req, res) => {
   try {
      const products = await Product.find({});
      res.json(products);
   } catch (error) {
      res.status(500).send('Error fetching products');
   }
};

// שליפת מוצר בודד לפי ID
// exports.getProductById = async (req, res) => {
//     try {
//        const product = await Product.findById(req.params.id);
//        if (!product) {
//           return res.status(404).send('Product not found');
//        }
//        res.json(product);
//     } catch (error) {
//        res.status(500).send('Error fetching product');
//     }
// };
