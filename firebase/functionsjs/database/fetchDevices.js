import { getDatabase, ref, onValue, push } from "firebase/database";
import { auth, db } from "../../firebaseConfig";
import { collection, getDocs, doc } from "firebase/firestore";

export const fetchDevices = async (userId, setDevices) => {
    try {
        const devicesRef = collection(doc(db, "users", userId), "devices");
        const querySnapshot = await getDocs(devicesRef);
        const devices = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        setDevices(devices);
    } catch (error) {
        console.error("Error fetching devices:", error.message);
    }
};