import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, useWindowDimensions } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Cargando from '../components/cargando';
import Encabezado from '../components/Encabezado';
import NotFound from './NotFound';
import { getTipos } from '../services/api';
import { colores, fuenteTitulo, tiposInfo } from '../theme/colores';

export default function Updates({ navigation }) {
  const [tipos, setTipos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const { width } = useWindowDimensions();
  const ancho = (width - 32 - 12) / 2;

  useEffect(() => {
    cargarTipos();
  }, []);

  async function cargarTipos() {
    setTipos(await getTipos());
    setCargando(false);
  }

  function goToTipo(tipo) {
    navigation.navigate('PokemonDelTipo', { categoria: tipo.id });
  }

  if (cargando) {
    return <Cargando />;
  }

  return (
    <View style={styles.container}>
      <Encabezado titulo="Tipos" subtitulo="Elige un tipo y mira quiénes lo tienen" />

      <FlatList
        data={tipos}
        numColumns={2}
        keyExtractor={item => item.id}
        columnWrapperStyle={styles.columnas}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => {
          const info = tiposInfo[item.id];
          return (
            <TouchableOpacity
              style={[styles.item, { width: ancho, backgroundColor: info?.color ?? colores.violeta }]}
              onPress={() => goToTipo(item)}
              activeOpacity={0.85}
            >
              <MaterialCommunityIcons
                name={info?.icono ?? 'star-four-points'}
                size={92}
                color="rgba(255,255,255,0.22)"
                style={styles.marca}
              />
              <Text style={styles.nombre}>{info?.nombre ?? item.nombre}</Text>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={<NotFound mensaje="No pudimos cargar los tipos. Revisa tu conexión." />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
  columnas: {
    gap: 12,
    paddingHorizontal: 16,
  },
  lista: {
    paddingTop: 16,
    paddingBottom: 20,
  },
  item: {
    height: 110,
    borderRadius: 26,
    padding: 16,
    marginBottom: 12,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  marca: {
    position: 'absolute',
    right: -12,
    top: -10,
  },
  nombre: {
    fontFamily: fuenteTitulo,
    fontSize: 20,
    fontWeight: '800',
    color: colores.blanco,
  },
});
