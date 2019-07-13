const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Types;
const { Schema } = mongoose;

const orderSchema = new Schema({
  product: {
    type: ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  }
});

module.exports = mongoose.model('Order', orderSchema);
