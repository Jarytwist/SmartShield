//Pantalla que muestra el contenido inicial para el usuario
// Importación de bibliotecas necesarias y componentes de React Native y Expo
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, Pressable, Button} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Shield from '../icons/logo';


export default function AboutScreen({navigation}) {
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
            <View style={{flexDirection: 'row'}}>
                <View style={{ width: 600, height: 600, marginLeft: 70}}>
                    <Text style={{fontSize: 26, fontWeight: '800'}}>
                        Who are we?
                    </Text>
                    <Text style={{fontSize: 22, marginTop: 45}}>
                        Who are we? We at SmartShield are an organization that aims to bring innovative technologies into the field whether is is for personal use or business, we have full trust on our work teams to develop quality products in the sensor technologies.
                    </Text>
                    <Text style={{fontSize: 22, marginTop: 35}}>
                        We are obliged to make our current and future developments available to the public to see, we at SmartShield believe in giving people the option to opt out of the data collection services and fully respect your decision to do so.
                    </Text>
                    <Text style={{fontSize: 24, marginTop: 45, fontWeight: '800'}}>
                        -SmartShield Team
                    </Text>
                </View>
                <View style={{ width: 600, height: 600, marginLeft: 130, marginTop: -30}}>
                    <Image style={{resizeMode: 'stretch', width: 260, height: 150, margin: 5}} source={require('../assets/1.png')}/>
                    <Image style={{resizeMode: 'stretch', width: 260, height: 150, margin: 5}} source={require('../assets/2.png')}/>
                    <Image style={{resizeMode: 'stretch', width: 260, height: 150, margin: 5}} source={require('../assets/3.png')}/>
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