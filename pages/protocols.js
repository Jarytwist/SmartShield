import React, { useState, useEffect } from 'react';
import {  View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Alert,
    Picker, } from 'react-native';
import { fetchDevices } from '../firebase/functionsjs/database/fetchDevices';
import { auth, db } from '../firebase/firebaseConfig';
import { collection, doc, addDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

const ProtocolsScreen = ({ navigation }) => {
    const userId = auth.currentUser?.uid;
    const [devices, setDevices] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState("");
    const [selectedMeasure, setSelectedMeasure] = useState("");
    const [selectedCondition, setSelectedCondition] = useState("");
    const [notificationType, setNotificationType] = useState("");
    const [notificationTarget, setNotificationTarget] = useState("");
    const [message, setMessage] = useState("");
    const [condition, setCondition] = useState("");
    const [value, setValue] = useState("");

    // Cargar dispositivos al montar el componente
    useEffect(() => {
        fetchDevices(userId, setDevices);
    }, [userId]);


    
    const saveEvent = async () => {
        if (!selectedDevice || !selectedMeasure || 
            !condition || !value || !notificationType ||
            !notificationTarget || !message) {
            alert("Por favor completa todos los campos.");
            return;
        }
    
        const event = {
            device: selectedDevice,
            measure: selectedMeasure,
            condition,
            value: parseFloat(value),
            notificationType,
            notificationTarget,
            message,
            timestamp: new Date().toISOString(),
        };
    
        try {
            const eventsRef = collection(doc(db, "users", userId), "events");
            await addDoc(eventsRef, event);
            alert("Evento guardado exitosamente.");
        } catch (error) {
            console.error("Error saving event:", error.message);
            alert("No se pudo guardar el evento.");
        }
        
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Selecciona un dispositivo:</Text>
            <Picker
                selectedValue={selectedDevice}
                onValueChange={(itemValue) => {
                setSelectedDevice(itemValue);
                setSelectedMeasure(""); // Reset measure when device changes
                }}
                style={styles.picker}
            >
                <Picker.Item label="Selecciona un dispositivo" value="" />
                {devices.map((device) => (
                <Picker.Item key={device.id} label={device.name} value={device.id} />
                ))}
            </Picker>

            {selectedDevice && (() => {
                const device = devices.find((device) => device.id === selectedDevice);
                if (device) {
                const measures = Object.keys(device).filter(
                    (key) => typeof device[key] === "number"
                );
                return (
                    <>
                    <Text style={styles.label}>Selecciona una medida:</Text>
                    <Picker
                        selectedValue={selectedMeasure}
                        onValueChange={(itemValue) => setSelectedMeasure(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Selecciona una medida" value="" />
                        {measures.map((measure) => (
                        <Picker.Item key={measure} label={measure} value={measure} />
                        ))}
                    </Picker>
                    </>
                );
                }
                return <Text>No hay medidas disponibles para este dispositivo.</Text>;
            })()}

            <Text style={styles.label}>Selecciona una condición:</Text>
            <Picker
                selectedValue={condition}
                onValueChange={(itemValue) => setCondition(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Selecciona una condición" value="" />
                <Picker.Item label="Mayor que" value="greater_than" />
                <Picker.Item label="Menor que" value="less_than" />
                <Picker.Item label="Igual a" value="equal_to" />
            </Picker>

            <Text style={styles.label}>Ingresa un valor:</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={value}
                onChangeText={setValue}
                placeholder="Ingresa un valor"
            />
            <Text style={styles.label}>Selecciona un tipo de notificación:</Text>
            <Picker
                selectedValue={notificationType}
                onValueChange={(itemValue) => setNotificationType(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Selecciona un tipo de notificación" value="" />
                <Picker.Item label="Correo Electrónico" value="email" />
                <Picker.Item label="Mensaje de Texto" value="sms" />
            </Picker>

            {notificationType === "email" && (
                <>
                <Text style={styles.label}>Ingresa el correo electrónico:</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="email-address"
                    value={notificationTarget}
                    onChangeText={setNotificationTarget}
                    placeholder="correo@example.com"
                />
                </>
            )}

            {notificationType === "sms" && (
                <>
                <Text style={styles.label}>Ingresa el número de teléfono:</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="phone-pad"
                    value={notificationTarget}
                    onChangeText={setNotificationTarget}
                    placeholder="1234567890"
                />
                </>
            )}

            <Text style={styles.label}>Mensaje:</Text>
            <TextInput
                style={styles.input}
                value={message}
                onChangeText={setMessage}
                placeholder="Escribe el mensaje de la notificación"
            />

            <Button title="Guardar Evento" onPress={saveEvent} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
    },
    picker: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        marginVertical: 5,
    },
});

export default ProtocolsScreen;
