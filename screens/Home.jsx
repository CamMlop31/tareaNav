import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import Cargando from '../components/cargando';
import Encabezado from '../components/Encabezado';
import TarjetaPokemon from '../components/TarjetaPokemon';
import NotFound from './NotFound';
import { TAMANO_PAGINA, getPokemones, getPokemonesPorTipo } from '../services/api';
import { colores, tiposInfo } from '../theme/colores';

export default function Home({ navigation, route }) {
  // El filtro llega desde el Drawer o desde la pestana Tipos (fire, water, grass...)
  const categoria = route.params?.categoria ?? '';
  const info = tiposInfo[categoria];

  const [pokemones, setPokemones] = useState([]);
  const [todos, setTodos] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [hayMas, setHayMas] = useState(true);
  const [cargando, setCargando] = useState(true);
  const [cargandoMas, setCargandoMas] = useState(false);

  // Cada vez que cambia el filtro se empieza de nuevo
  useEffect(() => {
    let activo = true;

    async function cargarPrimeraPagina() {
      setCargando(true);

      if (categoria === '') {
        const data = await getPokemones(1);
        if (!activo) return;
        setPokemones(data.data);
        setHayMas(data.hayMas);
      } else {
        // La API entrega todos los pokemon del tipo juntos, los mostramos por paginas
        const lista = await getPokemonesPorTipo(categoria);
        if (!activo) return;
        setTodos(lista);
        setPokemones(lista.slice(0, TAMANO_PAGINA));
        setHayMas(lista.length > TAMANO_PAGINA);
      }

      setPagina(1);
      setCargando(false);
    }

    cargarPrimeraPagina();
    return () => {
      activo = false;
    };
  }, [categoria]);

  async function cargarMas() {
    if (!hayMas || cargandoMas || cargando) return;
    setCargandoMas(true);
    const siguiente = pagina + 1;

    if (categoria === '') {
      const data = await getPokemones(siguiente);
      setPokemones(anteriores => [...anteriores, ...data.data]);
      setHayMas(data.hayMas);
    } else {
      const hasta = siguiente * TAMANO_PAGINA;
      setPokemones(todos.slice(0, hasta));
      setHayMas(todos.length > hasta);
    }

    setPagina(siguiente);
    setCargandoMas(false);
  }

  function goToDetalle(pokemon) {
    navigation.navigate('DetallePokemon', { nombre: pokemon.nombre, id: pokemon.id });
  }

  function quitarFiltro() {
    navigation.setParams({ categoria: '' });
  }

  if (cargando) {
    return <Cargando />;
  }

  return (
    <View style={styles.container}>
      <Encabezado
        titulo={categoria === '' ? 'Pokédex' : 'Tipo ' + (info?.nombre ?? categoria)}
        subtitulo={categoria === '' ? 'Toca un Pokémon para ver su ficha' : pokemones.length + ' de ' + todos.length + ' Pokémon'}
      >
        {categoria !== '' && route.name === 'ListaPokemon' && (
          <TouchableOpacity style={styles.chip} onPress={quitarFiltro}>
            <Text style={[styles.chipTexto, { color: info?.color ?? colores.violeta }]}>{info?.nombre ?? categoria}</Text>
            <Feather name="x" size={14} color={info?.color ?? colores.violeta} />
          </TouchableOpacity>
        )}
      </Encabezado>

      <FlatList
        data={pokemones}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <TarjetaPokemon pokemon={item} onPress={() => goToDetalle(item)} />
        )}
        onEndReached={cargarMas}
        onEndReachedThreshold={0.5}
        ListFooterComponent={cargandoMas ? <ActivityIndicator color={colores.violeta} style={styles.pie} /> : null}
        ListEmptyComponent={<NotFound mensaje="No pudimos cargar los Pokémon. Revisa tu conexión." />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: colores.blanco,
  },
  chipTexto: {
    fontWeight: '800',
  },
  lista: {
    paddingTop: 12,
    paddingBottom: 20,
  },
  pie: {
    marginVertical: 16,
  },
});
