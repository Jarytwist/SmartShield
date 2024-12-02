// Importación de la biblioteca Firebase y configuración del proyecto
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from 'firebase/database';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

//Pagina web Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCg33xz0fJO6FMSx0VUPoRTB80fI-lz4fI",
    authDomain: "smartshield-2936f.firebaseapp.com",
    projectId: "smartshield-2936f",
    storageBucket: "smartshield-2936f.firebasestorage.app",
    messagingSenderId: "404015253336",
    appId: "1:404015253336:web:a32a773e96aec3fa91072d"
};

//Inicializar firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { database, ref, onValue, auth, db };