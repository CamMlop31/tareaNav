import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import TabNavigation from './TabNavigation';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import img from "../assets/favicon.png";
import { useState } from 'react';
import { colores, fuenteTitulo } from '../theme/colores';

const Drawer = createDrawerNavigator();

const filtros = [
  { id: 1, nombre: "Todos", categoria: "" },
  { id: 2, nombre: "Fuego", categoria: "fire" },
  { id: 3, nombre: "Agua", categoria: "water" },
  { id: 4, nombre: "Planta", categoria: "grass" },
  { id: 5, nombre: "Eléctrico", categoria: "electric" },
  { id: 6, nombre: "Psíquico", categoria: "psychic" },
  { id: 7, nombre: "Dragón", categoria: "dragon" }
];

// Busca el filtro de la pantalla que se esta viendo, asi el chip activo
// del Drawer siempre coincide con la lista (incluso si se quita desde Home)
function categoriaDe(state) {
    let actual = state;
    let categoria = "";
    while (actual) {
        const ruta = actual.routes[actual.index ?? 0];
        if (ruta.params?.categoria !== undefined) {
            categoria = ruta.params.categoria;
        }
        actual = ruta.state;
    }
    return categoria;
}

function DrawerPersonalizado(props) {
    const insets = useSafeAreaInsets();
    const [usuario, setUsuario] = useState({
        id: 1,
        nombre: "Camila Murcia",
        correo: "camurcia@email.com"
    });
    const filtroActivo = categoriaDe(props.state);

    // Navega a Inicio > Pokedex > ListaPokemon pasando el filtro
    function goToFiltro(categoria) {
        props.navigation.navigate('Home', {
            screen: 'Pokedex',
            params: {
                screen: 'ListaPokemon',
                params: { categoria: categoria },
            },
        });
        props.navigation.closeDrawer();
    }

    return (
        <View style={{ flex: 1, backgroundColor: colores.noche }}>
            <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
                <View style={{ alignItems: 'center', paddingTop: 60, paddingBottom: 26 }}>
                    <Image
                        source={img}
                        style={{
                            width: 92,
                            height: 92,
                            borderRadius: 46,
                            borderWidth: 4,
                            borderColor: colores.coral,
                            backgroundColor: colores.violetaClara,
                        }}
                    />
                    <Text style={{ fontFamily: fuenteTitulo, fontSize: 26, fontWeight: '800', color: colores.blanco, marginTop: 12 }}>
                        {usuario.nombre}
                    </Text>
                </View>

                <DrawerItemList {...props} />

                <View style={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 12 }}>
                    <Text style={{ fontFamily: fuenteTitulo, fontSize: 18, fontWeight: '800', color: colores.violetaBrillo }}>
                        Filtrar por tipo
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 8 }}>
                    {filtros.map(item => {
                        const activo = filtroActivo === item.categoria;
                        return (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => goToFiltro(item.categoria)}
                                style={{
                                    paddingHorizontal: 14,
                                    paddingVertical: 8,
                                    borderRadius: 16,
                                    backgroundColor: activo ? colores.violetaBrillo : 'transparent',
                                    borderWidth: 1,
                                    borderColor: activo ? colores.violetaBrillo : colores.nocheSuave,
                                }}
                            >
                                <Text style={{ fontWeight: '700', color: activo ? colores.noche : colores.blanco }}>
                                    {item.nombre}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </DrawerContentScrollView>

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    paddingHorizontal: 20,
                    paddingTop: 16,
                    paddingBottom: insets.bottom + 16,
                    borderTopWidth: 1,
                    borderTopColor: 'rgba(255,255,255,0.14)',
                }}
            >
                <MaterialCommunityIcons name="email-outline" size={20} color={colores.violetaBrillo} />
                <Text style={{ color: colores.blanco }}>{usuario.correo}</Text>
            </View>
        </View>
    );
}


export default function DrawerN() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <DrawerPersonalizado {...props} />}
            screenOptions={{
                drawerActiveTintColor: colores.violetaBrillo,
                drawerInactiveTintColor: colores.blanco,
                drawerActiveBackgroundColor: 'rgba(185, 169, 255, 0.18)',
                drawerLabelStyle: { fontWeight: '700' },
                drawerStyle: { backgroundColor: colores.noche, width: 300 },
                drawerHideStatusBarOnOpen: true,
                headerStyle: { backgroundColor: colores.violeta, elevation: 0, shadowOpacity: 0 },
                headerTintColor: colores.blanco,
                headerTitleStyle: { fontFamily: fuenteTitulo, fontWeight: '800' },
            }}
        >
            <Drawer.Screen
                name="Home"
                component={TabNavigation}
                options={{
                    drawerLabel: "Inicio",
                    title: 'tareaNav',
                    drawerIcon: ({color}) => <MaterialCommunityIcons name="pokeball" size={24} color={color} />
                }}
            />
        </Drawer.Navigator>
    );
}
