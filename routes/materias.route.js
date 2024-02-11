const express = require('express');
const router = express.Router();

const MateriasController = require('../controllers/materias.controller');


/* POST materia */
router.post('/', (req, res) => {
    if (req.body && req.body.materia && req.body.facultad && req.body.prelacion && req.body.codigo) {
        const { materia, facultad, prelacion, codigo } = req.body;

        return res.status(201).json(
            MateriasController.ingresarMateria(materia, facultad, prelacion, codigo)
        );
    } else {
        return res.status(400).json({
            message: 'Datos incompletos',
            status: 400
        });
    }
});

/* PUT materia */
router.put('/:id', (req, res) => {
    if (req.body && (req.body.materia || req.body.facultad || req.body.prelacion || req.body.codigo)) {
        const { materia, facultad, prelacion, codigo } = req.body;
        const obj = MateriasController.editarMateria(req.params.id, materia, facultad, prelacion, codigo);

        if (obj) {
            return res.status(200).json(obj);
        }
    }

    return res.status(400).json({
        message: 'Datos incompletos o incorrectos',
        status: 400
    });
});



module.exports = router;
