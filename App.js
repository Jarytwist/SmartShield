// Importación de bibliotecas necesarias y componentes de React Native y Expo
// Aquí se configura la navegación entre pantallas y se define el stack principal de la ap
import 'react-native-gesture-handler';
import MyDrawer from './navigation/drawer';
import MyStack from './navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return(
    <NavigationContainer>
        <MyStack />
    </NavigationContainer>
  );
}