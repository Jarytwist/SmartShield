//Pantalla que muestra el contenido inicial para el usuario
// Importación de bibliotecas necesarias y componentes de React Native y Expo
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, Pressable, Button} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Shield from '../icons/logo';


export default function ProductsScreen({navigation}) {
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
        <View style={{alignItems: 'center'}}>
                <View style={{ width: 600, alignItems: 'center'}}>
                    <Text style={{fontSize: 30, fontWeight: '900'}}>
                        Wha products do we currently employ?
                    </Text>
                </View>
                <View style={{marginTop: 60, flexDirection: 'row'}}>
                    <Image style={{resizeMode: 'stretch', width: 260, height: 150, margin: 5, marginHorizontal: 20}} source={require('../assets/1.png')}/>
                    <Image style={{resizeMode: 'stretch', width: 260, height: 150, margin: 5, marginHorizontal: 20}} source={require('../assets/2.png')}/>
                    <Image style={{resizeMode: 'stretch', width: 260, height: 150, margin: 5, marginHorizontal: 20}} source={require('../assets/3.png')}/>
                </View>
                <View style={{marginTop: 60, flexDirection: 'row'}}>
                    <Text style={{fontSize: 20, fontWeight: '800', width: 200, marginHorizontal: 35}}>
                        Movement Detection With PIR Sensor
                    </Text>
                    <Text style={{fontSize: 20, fontWeight: '800', width: 250, marginHorizontal: 35}}>
                        Temperature and Humidity Measueremnt With DTH11
                    </Text>
                    <Text style={{fontSize: 20, fontWeight: '800', width: 200, marginHorizontal: 35}}>
                        Smoke and Gas Measueremnt With MQ9
                    </Text>
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
        justifyContent: 'space-between',
    },
    content:{
        backgroundColor: 'white', 
        marginTop: 65,
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