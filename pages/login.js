//Pantalla de inicio de seción del usuario
// Importación de bibliotecas necesarias y componentes de React Native y Expo
import { StatusBar } from 'expo-status-bar';
import { Alert } from 'react-native';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { handleLogin } from '../firebase/functionsjs/auth/authLogin';


export default function LoginScreen({navigation}) {
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
            </View>
        </View>
        <View style={styles.content}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 26, fontWeight: 'bold', marginBottom: 10}}>Log in to your Account</Text>
                <TextInput style={styles.input} onChangeText={setEmail} placeholder='Mail or User' />
                <TextInput style={styles.input} onChangeText={setPassword} placeholder='Passsword' secureTextEntry='true'/>
                <TouchableOpacity style={styles.button} onPress={() => handleLogin(email, password, navigation)}>
                    <Text style={{color: '#f2f2f2', fontSize: 17}}>Login Now</Text>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                    <Text>Don't have account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={{color: 'blue', marginLeft: 5}} >Create account</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                    <Text>Or Login with</Text>
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
