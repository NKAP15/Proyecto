import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema({

  productId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
},
  discount: { 
    type: Number, 
    required: true, 
    min: 0, 
    max: 100 
}, 
  startDate: { 
    type: Date, 
    required: true },

  endDate: { 
    type: Date, 
    required: true },

  employeeCommission: { 
    type: Number, 
    min: 0, 
    max: 100 }, 
}, {
  timestamps: true,
});

export default mongoose.model('Offer', offerSchema);