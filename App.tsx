import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import DrawerN from './navigation/DrawerN';
import { colores } from './theme/colores';

const tema = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colores.fondo,
    primary: colores.violeta,
    card: colores.violeta,
    text: colores.tinta,
    border: colores.borde,
  },
};

export default function App() {
  return (

    <NavigationContainer theme={tema}>
      <StatusBar style="light" />
      <DrawerN/>
    </NavigationContainer>

  );
}
