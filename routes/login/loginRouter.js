const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.json({
        body: 'Hola mUndo'
    })
});

module.exports = router;