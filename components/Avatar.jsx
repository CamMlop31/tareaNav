import React, { useState } from 'react';
import { View, Image } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { colores } from '../theme/colores';

// Imagen del pokemon. Si no carga (o falla) muestra una pokebola.
export default function Avatar({ uri, size = 96 }) {
  const [error, setError] = useState(false);

  if (!uri || error) {
    return (
      <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
        <MaterialCommunityIcons name="pokeball" size={size * 0.6} color={colores.violeta} />
      </View>
    );
  }

  return (
    <Image
      source={{ uri: uri }}
      style={{ width: size, height: size }}
      resizeMode="contain"
      onError={() => setError(true)}
    />
  );
}
