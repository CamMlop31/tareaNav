import { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Avatar from '../components/Avatar';
import Cargando from '../components/cargando';
import NotFound from './NotFound';
import { bonito, getDetalle, numero } from '../services/api';
import { colores, fuenteTitulo, sombra, tiposInfo } from '../theme/colores';

const nombresStats = {
  hp: 'PS',
  attack: 'Ataque',
  defense: 'Defensa',
  'special-attack': 'Ataque esp.',
  'special-defense': 'Defensa esp.',
  speed: 'Velocidad',
};

export default function Profile({ route, navigation }) {
  const { nombre } = route.params;

  const [detalle, setDetalle] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarDetalle();
  }, [nombre]);

  async function cargarDetalle() {
    setCargando(true);
    setDetalle(await getDetalle(nombre));
    setCargando(false);
  }

  function goBack() {
    navigation.goBack();
  }

  if (cargando) {
    return <Cargando />;
  }

  if (!detalle) {
    return <NotFound mensaje="No pudimos cargar este Pokémon. Revisa tu conexión." />;
  }

  const principal = tiposInfo[detalle.tipos[0]];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contenido}>
      <View style={[styles.cabecera, { backgroundColor: principal?.fondo ?? colores.violetaClara }]}>
        <Avatar uri={detalle.imagen} size={210} />
        <Text style={styles.numero}>{numero(detalle.id)}</Text>
        <Text style={styles.nombre}>{bonito(detalle.nombre)}</Text>

        <View style={styles.chips}>
          {detalle.tipos.map(tipo => (
            <Text key={tipo} style={[styles.chipTipo, { backgroundColor: tiposInfo[tipo]?.color ?? colores.violeta }]}>
              {tiposInfo[tipo]?.nombre ?? bonito(tipo)}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.medidas}>
        <View style={styles.medida}>
          <Text style={styles.medidaValor}>{detalle.altura} m</Text>
          <Text style={styles.medidaEtiqueta}>Altura</Text>
        </View>
        <View style={styles.medida}>
          <Text style={styles.medidaValor}>{detalle.peso} kg</Text>
          <Text style={styles.medidaEtiqueta}>Peso</Text>
        </View>
      </View>

      <View style={styles.caja}>
        <Text style={styles.titulo}>Habilidades</Text>
        <View style={styles.chips}>
          {detalle.habilidades.map(habilidad => (
            <Text key={habilidad} style={styles.chipHabilidad}>{bonito(habilidad)}</Text>
          ))}
        </View>
      </View>

      <View style={styles.caja}>
        <Text style={styles.titulo}>Estadísticas base</Text>
        {detalle.stats.map(stat => {
          const porcentaje = Math.min(100, Math.round((stat.valor / 150) * 100));
          return (
            <View key={stat.nombre} style={styles.fila}>
              <Text style={styles.statNombre}>{nombresStats[stat.nombre] ?? bonito(stat.nombre)}</Text>
              <Text style={styles.statValor}>{stat.valor}</Text>
              <View style={styles.pista}>
                <View
                  style={[
                    styles.barra,
                    { width: porcentaje + '%', backgroundColor: principal?.color ?? colores.violeta },
                  ]}
                />
              </View>
            </View>
          );
        })}
      </View>

      <TouchableOpacity style={styles.boton} onPress={goBack}>
        <Text style={styles.botonTexto}>Volver</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
  contenido: {
    paddingBottom: 30,
  },
  cabecera: {
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 26,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  numero: {
    color: colores.tintaSuave,
    fontWeight: '800',
    marginTop: 6,
  },
  nombre: {
    fontFamily: fuenteTitulo,
    fontSize: 34,
    fontWeight: '800',
    color: colores.tinta,
    textAlign: 'center',
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chipTipo: {
    color: colores.blanco,
    fontWeight: '800',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 14,
    overflow: 'hidden',
    marginTop: 12,
  },
  medidas: {
    flexDirection: 'row',
    gap: 12,
    marginHorizontal: 16,
    marginTop: 16,
  },
  medida: {
    flex: 1,
    backgroundColor: colores.blanco,
    borderRadius: 20,
    paddingVertical: 14,
    alignItems: 'center',
    ...sombra,
  },
  medidaValor: {
    fontFamily: fuenteTitulo,
    fontSize: 22,
    fontWeight: '800',
    color: colores.tinta,
  },
  medidaEtiqueta: {
    color: colores.tintaSuave,
    marginTop: 2,
  },
  caja: {
    backgroundColor: colores.blanco,
    marginHorizontal: 16,
    marginTop: 14,
    padding: 16,
    borderRadius: 22,
    ...sombra,
  },
  titulo: {
    fontFamily: fuenteTitulo,
    fontSize: 18,
    fontWeight: '800',
    color: colores.tinta,
    marginBottom: 10,
  },
  chipHabilidad: {
    backgroundColor: colores.violetaClara,
    color: colores.violeta,
    fontWeight: '700',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    overflow: 'hidden',
  },
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  statNombre: {
    width: 104,
    color: colores.tintaSuave,
    fontWeight: '600',
  },
  statValor: {
    width: 36,
    fontWeight: '800',
    color: colores.tinta,
  },
  pista: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    backgroundColor: colores.borde,
    overflow: 'hidden',
  },
  barra: {
    height: 8,
    borderRadius: 4,
  },
  boton: {
    alignSelf: 'center',
    marginTop: 22,
    backgroundColor: colores.violeta,
    paddingHorizontal: 30,
    paddingVertical: 13,
    borderRadius: 18,
  },
  botonTexto: {
    color: colores.blanco,
    fontWeight: '800',
  },
});
