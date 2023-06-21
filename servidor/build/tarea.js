"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const cron = require('node-cron');
const axios = require('axios');
// Programa la tarea para que se ejecute según tu horario deseado
cron.schedule('50 15 * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Realiza una solicitud HTTP a la ruta deseada en tu servidor
        const response = yield axios.get('http://localhost:3000/api/evaluacion/notificar');
        // Aquí puedes procesar la respuesta de la solicitud, si es necesario
        console.log('Respuesta:', response.data);
    }
    catch (error) {
        console.error('Error al realizar la solicitud:', error);
    }
}));
