const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CustomerSchema = new Schema({
    name: {type: String, required: true, max: 100},
    email: {type: String, required: true, max: 100},
    mobile: {type: String, required: true},
    address: {type: String, required: true},
});


// Export the model
module.exports = mongoose.model('Customer', CustomerSchema);
