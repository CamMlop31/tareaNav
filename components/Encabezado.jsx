import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colores, fuenteTitulo } from '../theme/colores';

// Banner violeta que va arriba de cada lista, con dos burbujas de color
export default function Encabezado({ titulo, subtitulo, children }) {
  return (
    <View style={styles.contenedor}>
      <View style={styles.burbuja} />
      <View style={styles.burbujaChica} />
      <Text style={styles.titulo}>{titulo}</Text>
      {subtitulo ? <Text style={styles.subtitulo}>{subtitulo}</Text> : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: colores.violeta,
    paddingHorizontal: 22,
    paddingTop: 4,
    paddingBottom: 26,
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34,
    overflow: 'hidden',
  },
  burbuja: {
    position: 'absolute',
    right: -34,
    top: -46,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colores.coral,
    opacity: 0.85,
  },
  burbujaChica: {
    position: 'absolute',
    right: 84,
    bottom: -26,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colores.sol,
    opacity: 0.9,
  },
  titulo: {
    fontFamily: fuenteTitulo,
    fontSize: 34,
    fontWeight: '800',
    color: colores.blanco,
  },
  subtitulo: {
    color: '#DCD3FF',
    marginTop: 4,
  },
});
