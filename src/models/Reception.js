import mongoose from 'mongoose';

const receptionSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',  
    required: true,
  },
  receptionDate: {
    type: Date,
    default: Date.now,
  },
  productsReceived: [
    {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product', 
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    expirationDate: {
      type: Date,
      required: true,
    },
    branch: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Branch',
    },
  }],
  branch: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
  },
});

export default  mongoose.model('Reception', receptionSchema);