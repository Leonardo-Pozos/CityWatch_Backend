const Report = require('../models/Report'); // Asegúrate de que esta ruta sea correcta

// Función auxiliar para validar que el campo 'location' GeoJSON esté presente
const validateLocation = (location) => {
    if (!location || !location.type || !location.coordinates) {
        throw new Error('El campo location (coordenadas) es obligatorio.');
    }

    // Validación básica para Point
    if (location.type === 'Point') {
        if (!Array.isArray(location.coordinates) || location.coordinates.length !== 2) {
            throw new Error('Las coordenadas para un Point deben ser [lng, lat].');
        }
    }

    // Validación básica para Polygon 
    if (location.type === 'Polygon') {
        const rings = location.coordinates;
        if (!Array.isArray(rings) || rings.length === 0 || !Array.isArray(rings[0]) || rings[0].length < 4) {
            throw new Error('Las coordenadas para un Polígono deben estar correctamente estructuradas (mínimo 4 vértices, incluyendo el cierre).');
        }
    }
};

// Obtener todos los reportes
const getAllReports = async () => {
    return await Report.find({}); 
};

// Buscar reportes por nombre (en address)
const searchReportsByName = async (name) => {
    return await Report.find({ address: { $regex: name, $options: 'i' } });
};

// Crear nuevo reporte
const createReport = async (reportData) => {
    // 1. Validar el GeoJSON antes de intentar guardar
    validateLocation(reportData.location);

    try {
        // 2. Crear el objeto Reporte usando el objeto GeoJSON 'location'
        const newReport = new Report({
            type: reportData.type,
            description: reportData.description,
            address: reportData.address,
            user: reportData.userId, // <- Usa el userId pasado por el router
            location: reportData.location // <- Objeto GeoJSON completo
        });

        return await newReport.save();
    } catch (error) {
        // Si el error viene de Mongoose, lo re-lanzamos.
        throw new Error(error.message);
    }
};

// Actualizar reporte
const updateReport = async (id, updateData) => {
    if (updateData.location) {
        validateLocation(updateData.location);
    }

    try {
        const updatedReport = await Report.findByIdAndUpdate(
            id,
            { 
                $set: {
                    type: updateData.type,
                    description: updateData.description,
                    address: updateData.address,
                    location: updateData.location 
                }
            },
            { new: true, runValidators: true }
        );
        return updatedReport;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Eliminar reporte
const deleteReport = async (id) => {
    return await Report.findByIdAndDelete(id);
};

module.exports = {
    getAllReports,
    searchReportsByName,
    createReport,
    updateReport,
    deleteReport
};