import { Platform } from 'react-native';

// Paleta de tareaNav: violeta vivo, lavanda, coral y sol
export const colores = {
  fondo: '#F6F4FF',
  blanco: '#FFFFFF',
  tinta: '#241B4B',
  tintaSuave: '#756EA3',
  borde: '#E6E1FA',
  violeta: '#6B4EFF',
  violetaClara: '#E4DDFF',
  violetaBrillo: '#B9A9FF',
  cielo: '#DDF0FF',
  coral: '#FF6B8B',
  sol: '#FFC857',
  noche: '#1E1650',
  nocheSuave: '#9A93CC',
};

// Fuente redondeada y amable que viene en el sistema (no hay que instalar nada)
export const fuenteTitulo = Platform.select({
  ios: 'Avenir Next',
  android: 'sans-serif-medium',
  default: 'system-ui, sans-serif',
});

export const sombra = {
  elevation: 3,
  shadowColor: '#3B2BA8',
  shadowOpacity: 0.14,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 4 },
};

// Fondos pastel para las tarjetas de los pokemon (se reparten segun su numero)
export const fondosTarjeta = ['#E7E1FF', '#FFE0E8', '#DDF0FF', '#FFF1C9', '#DDF7E8', '#FFE6D6'];

// Nombre en espanol, color, fondo suave e icono de cada tipo
export const tiposInfo = {
  normal: { nombre: 'Normal', color: '#7A8591', fondo: '#ECEFF2', icono: 'circle-outline' },
  fire: { nombre: 'Fuego', color: '#E8590C', fondo: '#FFE6D5', icono: 'fire' },
  water: { nombre: 'Agua', color: '#1C7ED6', fondo: '#DCEBFB', icono: 'water' },
  electric: { nombre: 'Eléctrico', color: '#B07D00', fondo: '#FFF4C2', icono: 'lightning-bolt' },
  grass: { nombre: 'Planta', color: '#2F9E44', fondo: '#DDF4E1', icono: 'leaf' },
  ice: { nombre: 'Hielo', color: '#1098AD', fondo: '#D7F3F7', icono: 'snowflake' },
  fighting: { nombre: 'Lucha', color: '#C92A2A', fondo: '#FADBD8', icono: 'arm-flex' },
  poison: { nombre: 'Veneno', color: '#9C36B5', fondo: '#F1DCF7', icono: 'skull' },
  ground: { nombre: 'Tierra', color: '#A9713A', fondo: '#F2E3D2', icono: 'terrain' },
  flying: { nombre: 'Volador', color: '#5C7CFA', fondo: '#E1E7FF', icono: 'bird' },
  psychic: { nombre: 'Psíquico', color: '#D6336C', fondo: '#FCDDE8', icono: 'eye' },
  bug: { nombre: 'Bicho', color: '#5C940D', fondo: '#E9F5D0', icono: 'bug' },
  rock: { nombre: 'Roca', color: '#8A7B5A', fondo: '#EDE8DB', icono: 'hexagon' },
  ghost: { nombre: 'Fantasma', color: '#5F3DC4', fondo: '#E6DEFA', icono: 'ghost' },
  dragon: { nombre: 'Dragón', color: '#3B5BDB', fondo: '#DCE3FF', icono: 'weather-hurricane' },
  dark: { nombre: 'Siniestro', color: '#495057', fondo: '#E3E5E8', icono: 'weather-night' },
  steel: { nombre: 'Acero', color: '#6C8497', fondo: '#E1EAF0', icono: 'cog' },
  fairy: { nombre: 'Hada', color: '#E0679A', fondo: '#FFE0EE', icono: 'flower' },
};

// Estilos de cabecera compartidos por los Stack
export const opcionesStack = {
  headerStyle: { backgroundColor: colores.violeta, elevation: 0, shadowOpacity: 0 },
  headerTintColor: colores.blanco,
  headerTitleStyle: { fontFamily: fuenteTitulo, fontWeight: '800' },
};
