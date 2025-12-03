const mongoose = require('mongoose');

// Definición del Sub-esquema GeoJSON
// Esta estructura es obligatoria para decirle a MongoDB/Mongoose
// que el campo puede ser un Point, Polygon, etc., y que las coordenadas
// deben ser tratadas geoespacialmente.
const geoSchema = new mongoose.Schema({
    type: {
        type: String, 
        enum: ['Point', 'Polygon'], // Se aceptan ambos tipos de geometría
        required: true
    },
    // Definimos coordinates como un Array de números, pero NO especificamos la anidación.
    // MongoDB lo manejará correctamente gracias al 'type' y al '2dsphere' index.
    coordinates: {
        type: Array, // Mongoose lo mapea correctamente a la estructura anidada necesaria
        required: true
    }
}, { _id: false }); // Opcional: Evita que el subdocumento 'location' tenga su propio _id

// Define el esquema del reporte
const reportSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    
    type: {
        type: String,
        required: true,
        trim: true,
    },
    
    description: {
        type: String,
        required: true,
        trim: true,
    },
    
    address: {
        type: String,
        required: true,
        trim: true,
    },

    // Aplicamos el sub-esquema GeoJSON
    location: {
        type: geoSchema, // <--- CAMBIO CLAVE: Usamos la definición de GeoSchema
        index: '2dsphere', // <--- CRÍTICO: El índice se aplica aquí, no dentro del subdocumento
        required: true
    },
    
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true 
});

// Exporta el modelo
const Report = mongoose.model('Report', reportSchema);

module.exports = Report;