//Pantalla que visualiza y administra los dispositivos IoT
// Importación de bibliotecas necesarias y componentes de React Native y Expo
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, TextInput} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState, useEffect } from 'react';
import { addDevice } from '../firebase/functionsjs/database/addDevice';
import { fetchDevices } from '../firebase/functionsjs/database/fetchDevices';
import { auth, db } from '../firebase/firebaseConfig';
import { collection, doc, addDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

// Lista de tipos de dispositivos disponibles
const DEVICE_TYPES = [
    { id: '1', name: 'Gas/Smoke Sensor', icon: 'smoke' },
    { id: '2', name: 'Temperature Sensor', icon: 'thermometer' },
    { id: '3', name: 'PIR Sensor', icon: 'motion-sensor' },
];

export default function DevicesScreen({navigation}) {
    const userId = auth.currentUser?.uid;
    const [userName, setUserName] = useState("");
    const [devices, setDevices] = useState([]);
    const [deviceName, setDeviceName] = useState("");
    const [deviceType, setDeviceType] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState(null);


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userDoc = await getDoc(doc(db, "users", user.uid));
                    if (userDoc.exists()) {
                        setUserName(userDoc.data().name);
                    }
                }
            } catch (error) {
                console.error("Error fetching user data:", error.message);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        if (userId) {
            fetchDevices(userId, setDevices);
        }
    }, [userId]);

    const handleAddDevice = async () => {
        if (deviceName && deviceType) {
            await addDevice(userId, deviceName, deviceName, deviceType);
            fetchDevices(userId, setDevices); // Actualiza la lista tras añadir
            setDeviceName("");
            setDeviceType("");
            setModalVisible(false);
        } else {
            alert("Please provide a device name and type.");
        }
    };

    const handleEditDevice = (device) => {
        setSelectedDevice(device);
        setDeviceName(device.name);
        setDeviceType(device.type);
        setModalVisible(true);
    };

    const handleSaveChanges = async () => {
        try {
            const deviceRef = doc(db, "users", userId, "devices", selectedDevice.id);
            await updateDoc(deviceRef, { name: deviceName, type: deviceType });
            fetchDevices(userId, setDevices); // Refresca la lista
            setModalVisible(false);
            setSelectedDevice(null);
        } catch (error) {
            console.error("Error updating device:", error.message);
        }
    };

    const handleDeleteDevice = async () => {
        try {
            const deviceDocRef = doc(db, "users", userId, "devices", selectedDevice.id);
            await deleteDoc(deviceDocRef);
            fetchDevices(userId, setDevices); // Refresca la lista
            setModalVisible(false);
            setSelectedDevice(null);
        } catch (error) {
            console.error("Error deleting device:", error.message);
        }
    };
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={{ fontSize: 30, marginLeft: 30, marginTop: 30 }}>
                    Your Devices, {userName}.
                </Text>
                <View style={{flexDirection: 'row'}}>
                    <FlatList
                        
                        style={{flexDirection: 'row'}}
                        data={devices}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.device} onPress={() => handleEditDevice(item)}>
                                <Text style={{ fontWeight: "900", fontSize: 20 }}>{item.name}</Text>
                                <MaterialCommunityIcons name={item.type} size={100} color="black" />
                            </TouchableOpacity>
                        )}
                        numColumns={2} 
                        ListEmptyComponent={
                            <Text style={{ marginLeft: 40, marginTop: 120, fontSize: 20, paddingRight: 40 }}>
                                No devices found. Add one below!
                            </Text>
                        }
                    />
                    <TouchableOpacity
                        style={styles.device}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={{ fontWeight: "900", fontSize: 20 }}>Add a new device</Text>
                        <AntDesign name="plus" size={40} color="gray" style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {setModalVisible(false); setSelectedDevice(null);}}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                                {selectedDevice ? "Edit Device" : "Add a New Device"}
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Device Name"
                                value={deviceName}
                                onChangeText={setDeviceName}
                            />
                            <FlatList
                                data={DEVICE_TYPES}
                                horizontal={true}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={[
                                            styles.deviceTypeOption,
                                            deviceType === item.icon && { backgroundColor: "#D7E8FF" },
                                        ]}
                                        onPress={() => setDeviceType(item.icon)}
                                    >
                                        <MaterialCommunityIcons name={item.icon} size={30} color="black" />
                                        <Text style={{ marginLeft: 10 }}>{item.name}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                            <View style={styles.modalButtons}>
                                <TouchableOpacity style={styles.button} onPress={selectedDevice ? handleSaveChanges : handleAddDevice}>
                                    <Text style={styles.buttonText}>{selectedDevice ? "Save Changes" : "Add Device"}</Text>
                                </TouchableOpacity>
                                {selectedDevice && (
                                    <TouchableOpacity
                                        style={[styles.button, { backgroundColor: "red" }]}
                                        onPress={handleDeleteDevice}
                                    >
                                        <Text style={styles.buttonText}>Delete Device</Text>
                                    </TouchableOpacity>
                                )}
                                <TouchableOpacity
                                    style={[styles.button, { backgroundColor: "gray" }]}
                                    onPress={() => {
                                        setModalVisible(false);
                                        setSelectedDevice(null);
                                    }}
                                >
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}    

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    bar:{backgroundColor: '#1E3963', 
        height: 90, width: 90, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    expandedBar:{backgroundColor: '#1E3963', 
        height: 90, width: 210, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    expandedSidebar:{
        backgroundColor: '#414E90', 
        height: '110%',
        width: 210,
    },
    sidebar:{
        backgroundColor: '#414E90', 
        height: '110%',
    },
    buttonSidebar:{
        backgroundColor: '#414E90',
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    content:{
        backgroundColor: '#d7d4e3', 
        height: '110%',
        width: '100%',
        alignItems: 'flex-start',
    },
    text:{
        color: 'white',
        fontSize: 20,
        marginHorizontal: 17,
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
        padding: 10,
        backgroundColor: "#7DADF5",
        borderRadius: 5,
        alignItems: "center",
    },
    button2:{
        flex: 1,
        marginHorizontal: 5,
        padding: 10,
        backgroundColor: "#EB102F",
        borderRadius: 5,
        alignItems: "center",
    },
    buttonCircle:{
        width: 50,
        height: 50,
        backgroundColor: '#1E3963',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
    },
    buttonText:{
        color: 'white',
        fontSize: 20
    },
    device:{
        backgroundColor: 'white', 
        height: 200, width: 250, 
        marginTop: 20, 
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "80%",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
    },
    input: {
        width: "100%",
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    deviceTypeOption: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        width: "100%",
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        width: "100%",
    },
});
