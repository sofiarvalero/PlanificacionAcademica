const express = require('express');
const router = express.Router();

const ProfesoresController = require('../controllers/profesores.controller');


/* POST profesor */
router.post('/', (req, res) => {
    if (req.body && req.body.nombre && req.body.apellido && req.body.correo && req.body.titulo) {
        const { nombre, apellido, correo, titulo } = req.body;
        
        return res.status(201).json(
            ProfesoresController.ingresarProfesor(nombre, apellido, correo, titulo)
        );
    } else {
        return res.status(400).json({
            message: 'Datos incompletos',
            status: 400
        });
    }
});


module.exports = router;
