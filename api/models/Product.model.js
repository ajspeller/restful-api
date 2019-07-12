const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  // _id: mongoose.Schema.'Types.ObjectId
  name: {
    type: String
  },
  price: {
    type: Number
  }
});

module.exports = mongoose.model('Product', productSchema);
