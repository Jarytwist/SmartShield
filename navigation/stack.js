// Importación de bibliotecas necesarias y componentes de React Native y Expo
// Aquí se configura la navegación entre pantallas y se define el stack principal de la ap
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//Se importan las pantallas realizadas
import HomeScreen from '../pages/home';
import OverviewScreen from '../pages/overview';
import LoginScreen from '../pages/login';
import RegisterScreen from '../pages/register';
import DevicesScreen from '../pages/devices';
import MyDrawer from './drawer';
import AboutScreen from '../pages/about';
import ProductsScreen from '../pages/products';
import DocumentationScreen from '../pages/documentation';
// Creación del stack para gestionar la navegación entre pantallas
const Stack = createStackNavigator();

const MyStack = () => (
    <Stack.Navigator initialRouteName="Home" >
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Products" component={ProductsScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Documentation" component={DocumentationScreen} options={{headerShown: false}}/>
        <Stack.Screen name="About" component={AboutScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Devices" component={MyDrawer} options={{headerShown: false}}/>
    </Stack.Navigator>
    );

export default MyStack;
