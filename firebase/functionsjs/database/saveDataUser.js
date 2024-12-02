import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebaseConfig";

export const saveUserData = async (uid) => {
    try {
        await setDoc(doc(db, "users", uid), {
        devices: [], // Inicialmente vacío
        createdAt: new Date().toISOString(),
        });
        console.log("Datos iniciales guardados para el usuario.");
    } catch (error) {
        console.error("Error al guardar datos iniciales:", error.message);
    }
};
