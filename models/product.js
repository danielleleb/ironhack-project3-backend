
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  owner: {type: Schema.Types.ObjectId, ref: 'User'},
  imageUrl: {
    type: String,
    default: '/uploads/1234567890123.jpg'
  },
  name: String,
  type: String,
  available: {
    type: Boolean,
    default: true
  },
  price: Number
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
