//Pantalla que muestra el contenido inicial para el usuario
// Importación de bibliotecas necesarias y componentes de React Native y Expo
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, Pressable, Button} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Shield from '../icons/logo';


export default function HomeScreen({navigation}) {
    return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <View style={{backgroundColor: '#1E3963', height: 90, width: 90}}/>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.text}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Products')}>
                    <Text style={styles.text}>Products</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Documentation')}>
                    <Text style={styles.text}>Documentation</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('About')}>
                    <Text style={styles.text}>About Us</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.text}>Log In</Text>  
                </TouchableOpacity>
            </View>
        </View>
        
        <View style={styles.content}>
            <View style={{alignItems: 'center', justifyContent: 'center', width: 600, height: 600}}>
                <Text style={{fontSize: 50, fontWeight: '500'}}>Security,          </Text>
                <Text style={{fontSize: 50, fontWeight: '500'}}>Made Smarter.</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                    <Text style={{color: '#f2f2f2', fontSize: 20}} >Let's Start</Text>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', marginTop: 10,}}>
                    <Text style={{marginBottom: 50}} >Do not have account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={{marginBottom: 50, color: '#7DADF5', marginLeft: 10}} >Start using SmartShield today</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
            <View style={{}}>
                <Image style={{resizeMode: 'stretch', width: 800, height: 600, marginTop: -60,}} source={require('../assets/Shield.png')}/>
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
        justifyContent: 'space-between',
    },
    content:{
        backgroundColor: 'white', 
        marginTop: 35,
        flexDirection: 'row'
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
        height: 40,
        backgroundColor: 'blue',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20,
    },
});