const express = require("express");
const router = express.Router(); // <--- CRÍTICO: Aquí se define 'router'
const service = require('../services/reportsService');

// Obtener todos los reportes
router.get('/', async (req, res) => {
    try {
        const reports = await service.getAllReports();
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Buscar reportes por nombre (búsqueda en address)
router.get('/search', async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({ error: 'El parámetro "name" es requerido' });
        }

        const reports = await service.searchReportsByName(name);
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear nuevo reporte
router.post('/', async (req, res) => {
    try {
        // *** CORRECCIÓN CLAVE: Extraer 'user' del body y renombrarlo a 'userId' ***
        // Esto captura el campo 'user' enviado por el cliente.
        const { type, description, address, location, user: userId } = req.body; 

        if (!userId) {
            return res.status(400).json({ error: 'El ID de usuario es requerido para crear un reporte.' });
        }
        
        // Se llama al servicio con un objeto que usa 'userId'
        const savedReport = await service.createReport({
            type,
            description,
            address,
            location,
            userId // <-- Se envía el ID renombrado
        });

        res.status(201).json(savedReport);
    } catch (error) {
        // Capturamos cualquier error de validación de Mongoose
        console.error("Error en POST /reports:", error.message);
        res.status(400).json({ error: error.message });
    }
});

// Actualizar reporte
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { type, description, address, location } = req.body; 
        
        const updatedReport = await service.updateReport(id, {
            type, 
            description, 
            address, 
            location
        });

        if (!updatedReport) {
            return res.status(404).json({ error: 'Reporte no encontrado' });
        }

        res.json(updatedReport);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Eliminar reporte
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedReport = await service.deleteReport(id);

        if (!deletedReport) {
            return res.status(404).json({ error: 'Reporte no encontrado' });
        }

        res.status(200).json({
            message: 'Reporte eliminado exitosamente',
            report: deletedReport
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;