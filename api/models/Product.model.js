const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    required: true
  },
  productImage: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Product', productSchema);
