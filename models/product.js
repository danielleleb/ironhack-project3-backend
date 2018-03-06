
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  owner: {type: Schema.Types.ObjectId, ref: 'User'},
  imageUrl: {
    type: String,
    default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Left_side_of_Flying_Pigeon.jpg/1200px-Left_side_of_Flying_Pigeon.jpg'
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
