const { v4: uuidv4 } = require('uuid');

const materias = [
    {
        "id": "014e61c4-8029-4f7e-bb5a-1b65a9528532",
        "materia": "Backend",
        "facultad": "Ingenieria",
        "prelacion": ["IS409", "IS410"],
        "codigo": "IS507"
    },
    {
        "id": "632955bd-2f71-4795-9cf4-6aec3e7482f3",
        "materia": "Estructura de Datos II",
        "facultad": "Ingenieria",
        "prelacion": ["IS416", "IS408"],
        "codigo": "IS409"
    },
    {
        "id": "e5f5bb1c-155f-4d4a-ad9e-e13b27490a8b",
        "materia": "Base de Datos I",
        "facultad": "Ingenieria",
        "prelacion": ["IS416", "IS408"],
        "codigo": "IS410"
    }
];


class MateriasController {
    ingresarMateria(materia, facultad, prelacion, codigo) {
        const id = uuidv4();
        const obj = { id, materia, facultad, prelacion, codigo };

        materias.push(obj);

        return obj;
    }

    existeMateria(materiaId) {
        for (const materia of materias) {
            if (materia.id === materiaId) return true;
        }

        return false;
    }

    editarMateria(materiaId, materiaN = false, facultadN = false, prelacionN = false, codigoN = false) {
        for (const materia of materias) {
            if (materia.id === materiaId) {
                materia.materia = (materiaN)? materiaN : materia.materia;
                materia.facultad = (facultadN)? facultadN : materia.facultad;
                materia.prelacion = (prelacionN)? prelacionN : materia.prelacion;
                materia.codigo = (codigoN)? codigoN : materia.codigo;

                return materia;
            }
        }

        return false;
    }

    buscarMateria(materiaId) {
        for (const materia of materias) {
            if (materia.id === materiaId) {
                return materia;
            }
        }

        return false;
    }
}


module.exports = new MateriasController();
