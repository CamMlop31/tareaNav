import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { colores } from '../theme/colores';

export default function Cargando() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colores.fondo }}>
      <ActivityIndicator size="large" color={colores.violeta} />
      <Text style={{ marginTop: 10, color: colores.tintaSuave }}>Buscando Pokémon...</Text>
    </View>
  );
}
