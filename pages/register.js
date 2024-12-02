//Pantalla para el registro de nuevos usuarios
// Importación de bibliotecas necesarias y componentes de React Native y Expo
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { handleRegister } from '../firebase/functionsjs/auth/authRegister';


export default function RegisterScreen({navigation}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <View style={{backgroundColor: '#1E3963', height: 90, width: 90}}/>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.text}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.text}>Products</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.text}>Documentation</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.text}>About Us</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.text}>Pricing</Text>  
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.content}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 26, fontWeight: 'bold', marginBottom: 10}}>Register to your Account</Text>
                <TextInput style={styles.input} onChangeText={setName} placeholder='Name' />
                <TextInput style={styles.input} onChangeText={setEmail} placeholder='Mail' />
                <TextInput style={styles.input} onChangeText={setPassword} placeholder='Passsword' secureTextEntry='true'/>
                <TouchableOpacity style={styles.button} onPress={() => handleRegister(name, email, password)}>
                    <Text style={{color: '#f2f2f2', fontSize: 17}}>Register Now</Text>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                    <Text>Already have account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={{color: 'blue', marginLeft: 5}} >Login with my account</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                    <Text>Or Register with</Text>
                    <Text style={{color: 'black', fontWeight: 'bold', marginLeft: 5}}> Others</Text>
                </View>
            </View>
        </View>

        <View style={styles.footer}>
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
    header:{
        flexDirection: 'row',
        backgroundColor: '#414E90', 
        height: 90,
        width: '100%',
        justifyContent: 'space-between'
    },
    content:{
        backgroundColor: 'white', 
        marginTop: 65,
    },
    input: {
        width: 370,
        height: 50,
        marginVertical: 8,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#d7d4e3',
    },
    text:{
        color: 'white',
        fontSize: 20,
        marginHorizontal: 17,
    },
    button:{
        width: 250,
        height: 55,
        backgroundColor: '#7DADF5',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    buttonG:{
        width: 150,
        height: 55,
        backgroundColor: '#d7d4e3',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginHorizontal: 8,
        flexDirection: 'row'

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
});
