import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import { opcionesStack } from '../theme/colores';

const stack = createStackNavigator();

const StackPokedex = () => {
  return (
   <stack.Navigator initialRouteName="ListaPokemon" screenOptions={opcionesStack}>
        <stack.Screen name="ListaPokemon" component={Home} options={{headerShown: false}} />
        <stack.Screen name="DetallePokemon" component={Profile} options={{title: 'Pokémon'}}/>
   </stack.Navigator>
  )
}

export default StackPokedex
