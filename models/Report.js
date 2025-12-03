const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Choque', 'Tráfico', 'Obra', 'Manifestación', 'Bache', 'Polígono'], 
        required: true
    },
    description: { type: String },
    address: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    location: {
        type: { type: String, enum: ['Point', 'Polygon'], required: true },
        coordinates: { type: Array, required: true } // [lng, lat] o [[[lng, lat], ...]] para polígono
    },
    createdAt: { type: Date, default: Date.now }
});

// Index geoespacial 2dsphere
ReportSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('report', ReportSchema);
