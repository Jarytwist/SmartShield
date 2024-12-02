// Importación de bibliotecas necesarias y componentes de React Native y Expo
// Aquí se configura la navegación entre pantallas y se define el stack principal de la ap
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { View, Text, Button } from 'react-native'
//Se importan las pantallas realizadas
import HomeScreen from '../pages/home';
import OverviewScreen from '../pages/overview';
import LoginScreen from '../pages/login';
import RegisterScreen from '../pages/register';
import DevicesScreen from '../pages/devices';
import ProtocolsScreen from '../pages/protocols';
// Creación del stack para gestionar la navegación entre pantallas
import MyStack from './stack';
const Drawer = createDrawerNavigator();


const MyDrawer = () => (
    <Drawer.Navigator initialRouteName="Overview" drawerPosition="left"
    screenOptions={{
        headerStyle: {backgroundColor: '#1E3963',},
        headerTintColor: 'white',
        drawerStyle: {backgroundColor: '#1E3963'},
        drawerLabelStyle: {color: 'white'},
    }}>
        <Drawer.Screen name="Overview" component={OverviewScreen}/>
        <Drawer.Screen name="Devices" component={DevicesScreen} />
        <Drawer.Screen name="Protocols" component={ProtocolsScreen} />
    </Drawer.Navigator>
);

export default MyDrawer;
