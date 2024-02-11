const { v4: uuidv4 } = require('uuid');

const SeccionesController = require('./secciones.controller');

const eventos = [
    {
        "id": "112759a4-85c1-4657-8f8b-1ee9162bcb87",
        "evento": "Corte de notas",
        "seccionId": "1d2d2476-0dab-457b-9eaa-8edcd3362dbb",
        "fecha": {
            "ano": 2024,
            "mes": 2,
            "dia": 20
        }
    },
    {
        "id": "112759a3-85c1-4657-8f8b-1ee9162bcb87",
        "evento": "Corte de notas",
        "seccionId": "1d2d2476-0dab-457b-9eaa-8edcd3362dbb",
        "fecha": {
            "ano": 2024,
            "mes": 9,
            "dia": 9
        }
    },
    {
        "id": "112759a2-85c1-4657-8f8b-1ee9162bcb87",
        "evento": "Corte de notas",
        "seccionId": "1d2d2476-0dab-457b-9eaa-8edcd3362dbb",
        "fecha": {
            "ano": 2023,
            "mes": 2,
            "dia": 20
        }
    },
    {
        "id": "112759a1-85c1-4657-8f8b-1ee9162bcb87",
        "evento": "Corte de notas",
        "seccionId": "1d2d2476-0dab-457b-9eaa-8edcd3362dbb",
        "fecha": {
            "ano": 2024,
            "mes": 3,
            "dia": 3
        }
    },
    {
        "id": "fa5ba3a9-32ad-4b17-8c55-98b67317b24c",
        "evento": "Corte de notas",
        "seccionId": "1d2d2476-0dab-457b-9eaa-8edcd3362dbb",
        "fecha": {
            "ano": 2024,
            "mes": 2,
            "dia": 8
        }
    },
    {
        "id": "c1bf9415-0a08-4e33-98cf-88eefcefadb9",
        "evento": "Corte de notas",
        "seccionId": "1d2d2476-0dab-457b-9eaa-8edcd3362dbb",
        "fecha": {
            "ano": 2024,
            "mes": 2,
            "dia": 10
        }
    },
    {
        "id": "8020f586-ed8c-48cb-bdfd-fb94cf6a1dfd",
        "evento": "Corte de notas",
        "seccionId": "bac9033f-d861-49cb-952f-2ad28574a7e7",
        "fecha": {
            "ano": 2024,
            "mes": 1,
            "dia": 10
        }
    },
    {
        "id": "8070e563-69a6-4137-9a79-6abf5415d546",
        "evento": "Corte de notas",
        "seccionId": "c83d0612-338d-4889-950d-26d2810575cb",
        "fecha": {
            "ano": 2024,
            "mes": 6,
            "dia": 12
        }
    }
];


class EventosController {
    ingresarEvento(evento, seccionId, fecha) {
        if (SeccionesController.existeSeccion(seccionId)) {
            const id = uuidv4();
            const obj = { id, evento, seccionId, fecha };

            eventos.push(obj);

            return obj;
        } else {
            return false;
        }
    }

    editarEvento(eventoId, eventoN = false, fechaN = false) {
        for (const evento of eventos) {
            if (evento.id === eventoId) {
                evento.evento = (eventoN)? eventoN : evento.evento;
                evento.fecha = (fechaN)? fechaN : evento.fecha;

                return evento;
            }
        }

        return false;
    }

    mostrarEventosPorSemana(materiaId) {
        const secciones_materia = SeccionesController.mostrarSeccionesPorMateria(materiaId);

        if (secciones_materia) {
            for (const seccion of secciones_materia.secciones) {
                seccion.eventos = [];

                for (const evento of eventos) {
                    if (evento.seccionId === seccion.id) {
                        seccion.eventos.push(evento);
                    }
                }

                seccion.eventos.sort((a, b) => {
                    if (a.fecha.ano === b.fecha.ano) {
                        if (a.fecha.mes === b.fecha.mes) {
                            if (a.fecha.dia > b.fecha.dia) {
                                return 1;
                            } else if (a.fecha.dia < b.fecha.dia) {
                                return -1;
                            } else {
                                return 0;
                            }
                        } else if (a.fecha.mes > b.fecha.mes) {
                            return 1;
                        } else {
                            return -1;
                        }
                    } else if (a.fecha.ano > b.fecha.ano) {
                        return 1;
                    } else {
                        return -1;
                    }
                });
            }

            return secciones_materia;
        } else {
            false;
        }
    }

    mostrarProximosEventos() {
        const prox_eventos = [];
        let actualF = new Date();
        let despuesF = new Date();

        despuesF.setDate(actualF.getDate() + 14);

        actualF = {
            ano: actualF.getFullYear(),
            mes: actualF.getMonth() + 1,
            dia: actualF.getDate()
        };

        despuesF = {
            ano: despuesF.getFullYear(),
            mes: despuesF.getMonth() + 1,
            dia: despuesF.getDate()
        };

        eventos.sort((a, b) => {
            const { fecha: fechaA } = a;
            const { fecha: fechaB } = b;

            if (fechaA.ano === fechaB.ano) {
                if (fechaA.mes === fechaB.mes) {
                    if (fechaA.dia === fechaB.dia) return 0;
                    if (fechaA.dia > fechaB.dia) return 1;
                    if (fechaA.dia < fechaB.dia) return -1;
                } else if (fechaA.mes > fechaB.mes) {
                    return 1;
                } else {
                    return -1;
                }
            } else if (fechaA.ano > fechaB.ano) {
                return 1;
            } else {
                return -1;
            }
        });

        for (const evento of eventos) {
            if (evento.fecha.ano === actualF.ano) {
                if (despuesF.mes === actualF.mes && evento.fecha.mes === actualF.mes) {
                    if (evento.fecha.dia >= actualF.dia && evento.fecha.dia <= despuesF.dia) {
                        prox_eventos.push(evento);
                    }
                } else if (evento.fecha.mes === actualF.mes || evento.fecha.mes === despuesF.mes) {
                    if (evento.fecha.dia >= actualF.dia || evento.fecha.dia <= despuesF.dia) {
                        prox_eventos.push(evento);
                    }
                }
            }
        }

        return prox_eventos;
    }

    eliminarEvento(eventoId) {
        for (const evento of eventos) {
            if (evento.id === eventoId) {
                eventos.splice(eventos.indexOf(evento), 1);
                return true;
            }
        }

        return false;
    }
}


module.exports = new EventosController();
