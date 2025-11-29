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
                .sort({ createdAt: -1 });
            return reports;
        } catch (error) {
            throw new Error('Error al obtener los reportes: ' + error.message);
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

        return await reportModel.findByIdAndUpdate(id, updateData, { new: true });
    }
}

module.exports = new reportsService();