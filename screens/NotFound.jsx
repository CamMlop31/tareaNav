import { StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { colores, fuenteTitulo } from '../theme/colores';

export default function NotFound({ mensaje = 'No encontramos lo que buscas.' }) {
  return (
    <View style={styles.container}>
      <View style={styles.icono}>
        <MaterialCommunityIcons name="pokeball" size={38} color={colores.violeta} />
      </View>
      <Text style={styles.titulo}>Sin resultados</Text>
      <Text style={styles.texto}>{mensaje}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 30,
  },
  icono: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colores.violetaClara,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontFamily: fuenteTitulo,
    fontSize: 22,
    fontWeight: '800',
    color: colores.tinta,
    marginTop: 14,
  },
  texto: {
    textAlign: 'center',
    color: colores.tintaSuave,
    marginTop: 6,
  },
});
