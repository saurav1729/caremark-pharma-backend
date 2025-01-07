const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    composition: { type: String, required: true },
    price: {
        original: { type: Number, required: true },
        discounted: { type: Number, required: true },
        discount_percentage: { type: Number, default: 0 },
        includes_taxes: { type: Boolean, required: true },
    },
    package_size: { type: String, required: true },
    stock_quantity: { type: Number, required: true },
    description: {
        short: { type: String, required: true },
        long: { type: String, required: true },
    },
    usage: {
        dosage: { type: String, required: true },
        instructions: { type: String, required: true },
        side_effects: { type: String, required: true },
        precautions: { type: String, required: true },
    },
    manufacturer_details: {
        name: { type: String, required: true },
        address: { type: String, required: true },
        license: { type: String, required: true },
    },
    batch_info: {
        number: { type: String, required: true },
        manufacturing_date: { type: Date, required: true },
        expiry_date: { type: Date, required: true },
    },
    prescription_required: { type: Boolean, required: true },
    availability: { type: String, enum: ['in stock', 'out of stock'], required: true },
    details:{
        authenticity:{ type: String, required: true }, 
        shipping:{ type: String, required: true }, 
        return_policy:{ type: String, required: true },
    },
    storage: { type: String, required: true },
    marketing: {
        company: { type: String, required: true },
        address: { type: String, required: true },
    },
    images: [
        {
          url: { type: String, required: true }
        }
      ],
});

module.exports = mongoose.model('Product', productSchema);
