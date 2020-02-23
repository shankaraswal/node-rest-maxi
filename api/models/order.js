const mongoose = require('mongoose');

//order schemea
const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    orderDateTime: {
      type: Date,
      required:true
    },
    prodid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
    quantity: {
        type: Number,
        required:true
    }
  });

module.exports = mongoose.model('Order', orderSchema);



