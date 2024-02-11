const { v4: uuidv4 } = require('uuid');

const MateriasController = require('./materias.controller');
const ProfesoresController = require('./profesores.controller');


const secciones = [
    {
        "id": "1d2d2476-0dab-457b-9eaa-8edcd3362dbb",
        "seccion": "10A",
        "materiaId": "014e61c4-8029-4f7e-bb5a-1b65a9528532",
        "profesorId": "4ba1467a-a6ac-49fe-aa21-316e1464b8f0"
    },
    {
        "id": "bac9033f-d861-49cb-952f-2ad28574a7e7",
        "seccion": "10B",
        "materiaId": "014e61c4-8029-4f7e-bb5a-1b65a9528532",
        "profesorId": "747eee26-0bf6-4490-a56f-f5f7d4c70424"
    },
    {
        "id": "c83d0612-338d-4889-950d-26d2810575cb",
        "seccion": "10C",
        "materiaId": "632955bd-2f71-4795-9cf4-6aec3e7482f3",
        "profesorId": "966e568c-1194-4d64-91f0-431318ec60d3"
    }
];


class SeccionesController {
    ingresarSeccion(seccion, materiaId, profesorId) {
        if (MateriasController.existeMateria(materiaId) && ProfesoresController.existeProfesor(profesorId)) {
            const id = uuidv4();
            const obj = { id, seccion, materiaId, profesorId };

            secciones.push(obj);

            return obj;
        } else {
            return false;
        }
    }

    existeSeccion(seccionId) {
        for (const seccion of secciones) {
            if (seccion.id === seccionId) return true;
        }

        return false;
    }

    cambiarAsociacionMateriaProfesor(seccionId, profesorId, materiaId) {
        for (const seccion of secciones) {
            if (seccion.id === seccionId) {
                seccion.profesorId = (ProfesoresController.existeProfesor(profesorId))? profesorId : seccion.profesorId;
                seccion.materiaId = (MateriasController.existeMateria(materiaId))? materiaId : seccion.materiaId;
                return seccion;
            }
        }

        return false;
    }

    mostrarSeccionesPorMateria(materiaId) {
        const materia = MateriasController.buscarMateria(materiaId);

        if (materia) {
            const secciones_materia = {
                materia,
                secciones: []
            };
    
            for (const seccion of secciones) {
                if (seccion.materiaId === materiaId) {
                    secciones_materia.secciones.push(seccion);
                }
            }
    
            return secciones_materia;
        } else {
            return false;
        }
    }

    mostrarProfesoresConMateriasAsociadas() {
        const profesores = ProfesoresController.mostrarProfesores();
        const profesores_materias = [];
     
        for (const profesor of profesores) {
            const profesor_materias = { profesor, materias: [] };

            for (const seccion of secciones) {
                if (seccion.profesorId === profesor.id) {
                    profesor_materias.materias.push(MateriasController.buscarMateria(seccion.materiaId));
                }
            }

            profesores_materias.push(profesor_materias);
        }

        return profesores_materias;
    }

    eliminarProfesor(seccionId) {
        for (const seccion of secciones) {
            if (seccion.id === seccionId) {
                seccion.profesorId = null;
                return seccion;
            }
        }

        return false;
    }
}


module.exports = new SeccionesController();
