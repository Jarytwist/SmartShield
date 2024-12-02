import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";

export const handleLogin = async (email, password, navigation) => {
    try {
        // Inicio de sesión del usuario
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        // Confirmar el inicio de sesión en consola
        console.log("Usuario autenticado:", user);
        // Redirección a la pantalla de overview/devices
        navigation.navigate("Devices"); // Ajusta con el nombre exacto de tu screen
    } catch (error) {
        console.error("Error en el inicio de sesión:", error.message);
        Alert.alert("Inicio de Sesión Fallido", "Verifica tus credenciales y vuelve a intentar.");
    }
};