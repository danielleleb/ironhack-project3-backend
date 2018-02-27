
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  type: String,
  available: {
    type: Boolean,
    default: true
  },
  price: Number
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
