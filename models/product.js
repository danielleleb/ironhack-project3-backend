
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  owner: {type: Schema.Types.ObjectId, ref: 'User'},
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
