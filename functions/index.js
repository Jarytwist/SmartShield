const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

// Inicializar Firebase Admin
admin.initializeApp();

// Configuración del transportador de nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // Configurar en el entorno de ejecución
        pass: process.env.EMAIL_PASS, // Configurar en el entorno de ejecución
    },
});

// Función que monitorea los eventos
exports.monitorDeviceEvents = onDocumentCreated(
    "users/{userId}/events/{eventId}",
    async (event) => {
        try {
            const snap = event.data; // Datos del documento
            const eventData = snap.data();
            const userId = event.params.userId;

            // Obtener datos del dispositivo relacionado
            const deviceRef = admin.firestore().doc(`users/${userId}/devices/${eventData.name}`);
            const deviceSnapshot = await deviceRef.get();

            if (!deviceSnapshot.exists) {
                console.log("Dispositivo no encontrado");
                return;
            }

            const deviceData = deviceSnapshot.data();

            // Evaluar la condición
            const conditionMet = evaluateCondition(deviceData, eventData);

            // Enviar notificación si la condición se cumple
            if (conditionMet) {
                await sendNotification(eventData);
                console.log("Notificación enviada con éxito.");
            }
        } catch (error) {
            console.error("Error al procesar el evento:", error);
        }
    }
);

// Función para evaluar la condición
const evaluateCondition = (deviceData, eventData) => {
    const { measure, condition, value } = eventData;
    const deviceValue = deviceData[measure]; // Accede al campo correspondiente del dispositivo

    switch (condition) {
        case "mayor que":
            return deviceValue > value;
        case "menor que":
            return deviceValue < value;
        case "igual a":
            return deviceValue === value;
        default:
            return false;
    }
};

// Función para enviar notificaciones
const sendNotification = async (eventData) => {
    const { notificationType, contactInfo, message } = eventData;

    if (notificationType === "correo") {
        try{
            // Enviar correo
            await transporter.sendMail({
                from: process.env.EMAIL_USER, // Tu correo configurado
                to: contactInfo, // Correo de destino
                subject: "Notificación de evento IoT",
                text: message,
            });
            console.log(`Notificación enviada a ${contactInfo} con el mensaje: ${message}`);
        } catch (error) {
            console.error('Error al enviar el correo:', error);
        }
    } else if (notificationType === "mensaje") {
        // Implementa la lógica para mensajes de texto si es necesario
        console.log("Enviar mensajes aún no está implementado.");
    }
};
