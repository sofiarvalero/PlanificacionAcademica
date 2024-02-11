const express = require('express');
const router = express.Router();

const SeccionesController = require('../controllers/secciones.controller');


/* POST seccion */
router.post('/', (req, res) => {
    if (req.body && req.body.seccion && req.body.materia && req.body.profesor) {
        const { seccion, materia, profesor } = req.body;
        const obj = SeccionesController.ingresarSeccion(seccion, materia, profesor);

        if (obj) {
            return res.status(201).json(obj);
        } else {
            return res.status(404).json({
                message: 'Los datos materia y/o profesor son incorrectos',
                satatus: 404
            });
        }
    } else {
        return res.status(400).json({
            message: 'Datos incompletos',
            status: 400
        });
    }
});

/* PUT asociacion materia profesor */
router.put('/materia_profesor/:id', (req, res) => {
    if (req.body && req.body.profesor && req.body.materia) {
        const { profesor, materia } = req.body;
        const seccion = SeccionesController.cambiarAsociacionMateriaProfesor(req.params.id, profesor, materia);

        if (seccion) {
            return res.status(200).json(seccion)
        } else {
            return res.status(404).json({
                message: 'Los datos son incorrectos',
                satatus: 404
            });
        }
    } else {
        return res.status(400).json({
            message: 'Datos incompletos',
            status: 400
        });
    }
});

/* GET materias por profesor */
router.get('/materias/profesor', (req, res) => {
    return res.status(200).json(SeccionesController.mostrarProfesoresConMateriasAsociadas());
});

/* DELETE asociacion profesor_materia */
router.delete('/profesor/:id', (req, res) => {
    const eliminado = SeccionesController.eliminarProfesor(req.params.id);

    if (eliminado) {
        return res.status(200).json(eliminado);
    } else {
        return res.status(404).json({
            message: 'Los datos son incorrectos',
            satatus: 404
        });
    }
})


module.exports = router;
