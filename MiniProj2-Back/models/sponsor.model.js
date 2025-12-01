const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const sponsorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    animal: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    active: {
        type: Boolean,
        default: true
    }
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.sponsor, sponsorSchema);
