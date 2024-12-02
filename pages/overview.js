//Pantalla que muestra la pizarra de información de los dispositivos IoT
// Importación de bibliotecas necesarias y componentes de React Native y Expo
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, TextInput} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState, useEffect } from 'react';
import { database, ref, onValue } from '../firebase/firebaseConfig';
import { addDevice } from '../firebase/functionsjs/database/addDevice';
import { fetchDevices } from '../firebase/functionsjs/database/fetchDevices';
import { auth, db } from '../firebase/firebaseConfig';
import { collection, doc, addDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import HumidityDisplay from '../components/humidityDisplay';
import GasDisplay from '../components/gasDisplay';
import TemperatureDisplay from '../components/temperatureDisplay';

// Lista de tipos de dispositivos disponibles
const DEVICE_TYPES = [
    { id: '1', name: 'Gas/Smoke Sensor', icon: 'smoke' },
    { id: '2', name: 'Temperature Sensor', icon: 'thermometer' },
    { id: '3', name: 'PIR Sensor', icon: 'motion-sensor' },
];

export default function OverviewScreen({navigation}) {
    const userId = auth.currentUser?.uid
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
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={{fontSize: 30, marginLeft: 30, marginTop: 30}}>Your Overview, {userName}!.</Text>
                <View style={{flexDirection: 'row'}}>
                    <FlatList  
                        style={{flexDirection: 'row'}}
                        data={devices}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={{
                                backgroundColor: 'white', 
                                padding: 20,
                                marginTop: 20, 
                                borderRadius: 20,
                                alignItems: 'center',
                                marginLeft: 20,
                                marginRight: 10}}>
                                <Text style={{ fontSize: 17, marginTop: 20 }}>{item.name}</Text>
                                <View style={{flexDirection: 'row'}}>
                                    {item.temperature !== undefined && (
                                        <View style={{margin: 10, alignItems: 'center'}}>
                                            <Text style={{ fontWeight: "900", fontSize: 20, marginTop: 10 }}>Temp:</Text> 
                                            <Text style={{ fontSize: 40, marginTop: 5,fontWeight: "900", marginRight: 10 }}>{item.temperature ? `${item.temperature}°` : "No value available"}</Text>
                                        </View>
                                    )}
                                    {item.humidity !== undefined && (
                                        <View style={{margin: 10, alignItems: 'center'}}>
                                            <Text style={{ fontWeight: "900", fontSize: 20, marginTop: 10 }}>Hum:</Text> 
                                            <Text style={{ fontSize: 40, marginTop: 5,fontWeight: "900", marginLeft: 10 }}>{item.humidity ? `${item.humidity}°` : "No value available"}</Text>
                                        </View>
                                    )}
                                    {item.temperature === undefined && item.humidity === undefined &&(
                                        <Text style={{ fontSize: 20, marginTop: 30,}}>No value available</Text>
                                    )}
                                </View>
                            </View>
                        )}
                        numColumns={2} 
                        ListEmptyComponent={
                            <Text style={{ marginLeft: 40, marginTop: 120, fontSize: 20, paddingRight: 40 }}>
                                No data found. Do you have devices?!
                            </Text>
                        }
                    />
                </View>
            </View>
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
        alignItems: 'flex-start'
    },
    text:{
        color: 'white',
        fontSize: 20,
        marginHorizontal: 17,
    },
    button:{
        width: 200,
        height: 50,
        backgroundColor: '#7DADF5',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        marginLeft: -120,
        marginBottom: 5,
    },
    button2:{
        width: 110,
        height: 50,
        backgroundColor: 'blue',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20,
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
    view:{
        backgroundColor: 'white', 
        height: 200, width: 250, 
        marginTop: 20, 
        borderRadius: 20,
        alignItems: 'center',
        marginHorizontal: 20,
    },
});
