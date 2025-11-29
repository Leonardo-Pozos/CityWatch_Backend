const express = require("express");
const router = express.Router();
const service = require('../services/reportsService');

router.get('/', async (req, res) => {
    try {
        const reports = await service.getAllReports();
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { type, description, latitude, longitude, userId, address } = req.body;
        const savedReport = await service.createReport(
            type, 
            description, 
            latitude, 
            longitude, 
            userId,
            address
        );

        res.status(201).json(savedReport);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { type, description, address, latitude, longitude } = req.body;

        const updatedReport = await service.updateReport(id, {
            type, description, address, latitude, longitude
        });

        if (!updatedReport) {
            return res.status(404).json({ error: 'Reporte no encontrado' });
        }

        res.json(updatedReport);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;