var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({

    name: {
        type: String
    },
    brand: {
        type: String
    },
    category: {
        type: String
    },
    price: {
        type: Number
    },
    color: {
        type: String
    },
    size: {
        type: String
    },
    manuDate: {
        type: Date
    },
    weight: {
        type: String
    },
    quantity: {
        type: Number
    },
    quality: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    tags: [String],
    status: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
}, {
    timestamps: true
});

var ProductModel = mongoose.model('eproduct', productSchema);
module.exports = ProductModel;