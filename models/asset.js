const mongoose = require('mongoose');

const AssetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    item: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Item' 
    },
    filePath: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Asset', AssetSchema);
