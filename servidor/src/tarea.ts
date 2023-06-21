const cron = require('node-cron');
const axios = require('axios');

// Programa la tarea para que se ejecute según tu horario deseado
cron.schedule('30 16 * * *', async () => {
  try {
    // Realiza una solicitud HTTP a la ruta deseada en tu servidor
    const response = await axios.get('http://localhost:3000/api/evaluacion/notificar');

    // Aquí puedes procesar la respuesta de la solicitud, si es necesario
    console.log('Respuesta:', response.data);
  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
});
