import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Updates from '../screens/Updates';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import { opcionesStack } from '../theme/colores';

const stack = createStackNavigator();

const StackTipos = () => {
  return (
   <stack.Navigator initialRouteName="ListaTipos" screenOptions={opcionesStack}>
        <stack.Screen name="ListaTipos" component={Updates} options={{headerShown: false}} />
        <stack.Screen name="PokemonDelTipo" component={Home} options={{title: 'Tipo'}}/>
        <stack.Screen name="DetallePokemon" component={Profile} options={{title: 'Pokémon'}}/>
   </stack.Navigator>
  )
}

export default StackTipos
