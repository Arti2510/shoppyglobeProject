import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  brand: {type: String, required: true},
  description: { type: String },
  stock: { type: Number, default: 0 }
});

export default mongoose.model('Product', productSchema);