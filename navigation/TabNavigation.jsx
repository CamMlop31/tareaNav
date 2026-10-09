import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import StackPokedex from './StackPokedex';
import StackTipos from './StackTipos';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { colores } from '../theme/colores';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Pokedex"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colores.violeta,
        tabBarInactiveTintColor: '#A39DCB',
        tabBarLabelStyle: { fontWeight: '700', fontSize: 12 },
        tabBarStyle: {
          backgroundColor: colores.blanco,
          borderTopWidth: 0,
          borderTopLeftRadius: 26,
          borderTopRightRadius: 26,
          height: 70,
          paddingTop: 8,
          paddingBottom: 10,
          elevation: 12,
          shadowColor: '#3B2BA8',
          shadowOpacity: 0.12,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: -4 },
        },
      }}
    >
        <Tab.Screen name='Pokedex' component={StackPokedex} options={{tabBarLabel: 'Pokédex', tabBarIcon:({color})=> <MaterialCommunityIcons name="pokeball" size={26} color={color} />}}/>
        <Tab.Screen name='Tipos' component={StackTipos} options={{tabBarIcon:({color})=> <MaterialCommunityIcons name="shape" size={24} color={color} />}}/>
    </Tab.Navigator>

  )
}

export default TabNavigation
