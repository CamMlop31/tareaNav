import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Avatar from './Avatar';
import { bonito, numero } from '../services/api';
import { colores, fondosTarjeta, fuenteTitulo, sombra } from '../theme/colores';

// Tarjeta ancha: imagen a la izquierda, nombre y numero al centro
export default function TarjetaPokemon({ pokemon, onPress }) {
  const fondo = fondosTarjeta[pokemon.id % fondosTarjeta.length];

  return (
    <TouchableOpacity style={styles.tarjeta} onPress={onPress} activeOpacity={0.85}>
      <View style={[styles.imagen, { backgroundColor: fondo }]}>
        <Avatar uri={pokemon.imagen} size={78} />
      </View>

      <View style={styles.info}>
        <Text style={styles.numero}>{numero(pokemon.id)}</Text>
        <Text style={styles.nombre} numberOfLines={1}>{bonito(pokemon.nombre)}</Text>
      </View>

      <View style={styles.flecha}>
        <MaterialCommunityIcons name="chevron-right" size={22} color={colores.violeta} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colores.blanco,
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 10,
    borderRadius: 26,
    gap: 14,
    ...sombra,
  },
  imagen: {
    width: 88,
    height: 88,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
  },
  numero: {
    color: colores.violeta,
    fontWeight: '800',
    fontSize: 13,
  },
  nombre: {
    fontFamily: fuenteTitulo,
    fontSize: 20,
    fontWeight: '800',
    color: colores.tinta,
    marginTop: 2,
  },
  flecha: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colores.violetaClara,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
});
