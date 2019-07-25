var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    phone: Number,
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        perAddress: String,
        temAddress: String
    },
    role: {
        type: Number, // 1 Main Admin || 2 Normal User
        default: 2
    }
}, {
    timestamps: true
});

var UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;