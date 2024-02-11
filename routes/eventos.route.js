const express = require('express');
const router = express.Router();

const EventosController = require('../controllers/eventos.controller');


/* POST evento */
router.post('/', (req, res) => {
    if (req.body && req.body.evento && req.body.seccion && req.body.fecha) {
        const { evento, seccion, fecha } = req.body;
        const obj = EventosController.ingresarEvento(evento, seccion, fecha);

        if (obj) {
            return res.status(201).json(obj);
        } else {
            return res.status(404).json({
                message: 'El dato seccion es incorrecto',
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

/* PUT evento */
router.put('/:id', (req, res) => {
    if (req.body && (req.body.evento || req.body.fecha)) {
        const { evento, fecha } = req.body;
        const obj = EventosController.editarEvento(req.params.id, evento, fecha);

        if (obj) {
            return res.status(200).json(obj);
        }
    }

    return res.status(400).json({
        message: 'Datos incompletos o incorrectos',
        status: 400
    });
});

/* GET eventos por materia */
router.get('/porMateria/:materiaId', (req, res) => {
    const eventos_materia = EventosController.mostrarEventosPorSemana(req.params.materiaId);

    if (eventos_materia) {
        return res.status(200).render('eventosPorMateria', {
            title: 'Eventos por semana',
            eventos_materia
        });
    } else {
        return res.status(400).json({
            message: 'Identificador de materia incorrecto',
            status: 400
        });
    }
});

/* GET proximos eventos */
router.get('/proximos', (req, res) => {
    return res.status(200).render('proximosEventos', {
        title: 'Próximos eventos',
        eventos: EventosController.mostrarProximosEventos()
    });
});

/* DELETE evento */
router.delete('/eliminar/:id', (req, res) => {
    const eliminado = EventosController.eliminarEvento(req.params.id);

    if (eliminado) {
        return res.status(200).json({
            message: 'Evento eliminado',
            status: 200
        });
    } else {
        return res.status(400).json({
            message: 'Datos incorrectos',
            status: 400
        });
    }
});


module.exports = router;
