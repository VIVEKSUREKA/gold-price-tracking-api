import mongoose from 'mongoose';

// Define the price entry schema
const priceEntrySchema = new mongoose.Schema({
  price: Number,
  timestamp: { type: Date, default: Date.now },
});

// Define the gold item schema
const goldItemSchema = new mongoose.Schema(
  {
    customId: {
      type: String,
      unique: true,
      required: true,
    },
    price: Number,
    grams: Number,
    priceHistory: [priceEntrySchema], //this array will be used to give best price of an item
  },
  { timestamps: true }
);

// Pre-save hook to update the priceHistory array
// This hook ensures that every new price of an item is stored in db 
goldItemSchema.pre('save', function (next) {
  // Check if the 'price' field is modified
  if (this.isModified('price')) {
    const priceEntry = {
      price: this.price,
      timestamp: new Date(),
    };
    this.priceHistory.push(priceEntry);
  }
  next();
});

// Create the GoldItem model
const GoldItem = mongoose.model('GoldItem', goldItemSchema);

export default GoldItem;