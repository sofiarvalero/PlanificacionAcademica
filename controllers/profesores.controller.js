const { v4: uuidv4 } = require('uuid');

const profesores = [
    {
        "id": "4ba1467a-a6ac-49fe-aa21-316e1464b8f0",
        "nombre": "Sofia",
        "apellido": "Husktgui",
        "correo": "husktgui@gmail.com",
        "titulo": "Licenciado"
    },
    {
        "id": "747eee26-0bf6-4490-a56f-f5f7d4c70424",
        "nombre": "Jesus",
        "apellido": "B-rios",
        "correo": "b_rios@gmail.com",
        "titulo": "Bachiller"
    },
    {
        "id": "966e568c-1194-4d64-91f0-431318ec60d3",
        "nombre": "Ricardo",
        "apellido": "Brio",
        "correo": "b_rio@gmail.com",
        "titulo": "..."
    }
];


class ProfesoresController {
    ingresarProfesor(nombre, apellido, correo, titulo) {
        const id = uuidv4();
        const profesor = { id, nombre, apellido, correo, titulo };

        profesores.push(profesor);

        return profesor;
    }

    existeProfesor(profesorId) {
        for (const profesor of profesores) {
            if (profesor.id === profesorId) return true;
        }

        return false;
    }

    mostrarProfesores() {
        return profesores;
    }
}


module.exports = new ProfesoresController();
