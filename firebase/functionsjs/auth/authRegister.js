import { auth, db } from "../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";

export const handleRegister = async (name, email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("Usuario registrado:", userCredential.user);
        await setDoc(doc(db, "users", user.uid), {
            name: name,
            email: email,
            devices: [], // Inicialmente vacío
            createdAt: new Date().toISOString(),
        });
        console.log("Usuario registrado y datos guardados:", user.uid);
        //Inicio de sesión automatico
        await signInWithEmailAndPassword(auth, email, password);

        // Redirección a la pantalla de overview/devices
        navigation.navigate("Overview");
    } catch (error) {
        console.error("Error al registrar usuario:", error.message);
    }
};