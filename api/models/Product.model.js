const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  // _id: mongoose.Schema.'Types.ObjectId
  name: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);
