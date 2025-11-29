const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Choque', 'Tráfico', 'Obra', 'Manifestación', 'Bache'], 
        required: true
    },
    description: {
        type: String,
        required: false
    },
    address: { 
        type: String, 
        required: true 
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'], 
            default: 'Point'
        },
        coordinates: {
            type: [Number], 
            required: true
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

ReportSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('report', ReportSchema);