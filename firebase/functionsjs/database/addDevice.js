import { auth, db } from "../../firebaseConfig";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

export const addDevice = async (userId, deviceId, name, type) => {
    try {
        // Referencia a la colección "devices" dentro del documento del usuario
        const devicesRef = collection(doc(db, "users", userId), "devices");
        
        // Crear referencia al documento con ID personalizado
        const deviceDoc = doc(devicesRef, deviceId);

        // Establecer los datos del dispositivo en el documento con el ID personalizado
        await setDoc(deviceDoc, { name, type });
        
        console.log("Device added successfully!");
    } catch (error) {
        console.error("Error adding device:", error.message);
    }
};