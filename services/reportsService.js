const reportModel = require('../models/Report');

class reportsService {
    constructor() { }

    async createReport(type, description, latitude, longitude, userId, address) {
        if (!latitude || !longitude) {
            throw new Error('Las coordenadas son obligatorias');
        }

        const newReport = new reportModel({
            type,
            description,
            address,
            user: userId,
            location: {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
        });

        return await newReport.save();
    }

    async getAllReports() {
        try {
            const reports = await reportModel.find()
                .populate('user', 'name lastName email')
                .sort({ createdAt: -1 });
            return reports;
        } catch (error) {
            throw new Error('Error al obtener los reportes: ' + error.message);
        }
    }

    async searchReportsByName(searchTerm) {
        try {
            // Búsqueda exacta por nombre/dirección
            // Usa regex para búsqueda case-insensitive
            const reports = await reportModel.find({
                address: { $regex: searchTerm, $options: 'i' }
            })
                .populate('user', 'name lastName email')
                .sort({ createdAt: -1 });

            return reports;
        } catch (error) {
            throw new Error('Error al buscar reportes: ' + error.message);
        }
    }

    async updateReport(id, data) {
        const updateData = {
            type: data.type,
            description: data.description,
            address: data.address,
            location: {
                type: 'Point',
                coordinates: [data.longitude, data.latitude]
            }
        };

        return await reportModel.findByIdAndUpdate(id, updateData, { new: true })
            .populate('user', 'name lastName email');
    }

    async deleteReport(id) {
        try {
            const deletedReport = await reportModel.findByIdAndDelete(id)
                .populate('user', 'name lastName email');
            return deletedReport;
        } catch (error) {
            throw new Error('Error al eliminar el reporte: ' + error.message);
        }
    }

    // Método adicional para obtener reporte por ID (útil para el frontend)
    async getReportById(id) {
        try {
            const report = await reportModel.findById(id)
                .populate('user', 'name lastName email');
            return report;
        } catch (error) {
            throw new Error('Error al obtener el reporte: ' + error.message);
        }
    }
}

module.exports = new reportsService();