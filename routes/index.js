const express = require('express');
const router = express.Router();

const ProfesoresRoute = require('./profesores.route');
const MateriasRoute = require('./materias.route');
const SeccionesRoute = require('./secciones.route');
const EventosRoute = require('./eventos.route');


router.use('/profesores', ProfesoresRoute);
router.use('/materias', MateriasRoute);
router.use('/secciones', SeccionesRoute);
router.use('/eventos', EventosRoute);


module.exports = router;
