const BASE = 'https://pokeapi.co/api/v2';
const IMAGENES = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';

export const TAMANO_PAGINA = 20;
// Despues del 1025 la API trae formas alternativas (mega, regionales...), las dejamos fuera
const TOTAL = 1025;

// Si la API falla o no encuentra nada devolvemos null
async function pedir(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      return null;
    }
    return await res.json();
  } catch (error) {
    return null;
  }
}

// "https://pokeapi.co/api/v2/pokemon/25/" -> 25
function idDeUrl(url) {
  const partes = url.split('/').filter(parte => parte !== '');
  return Number(partes[partes.length - 1]);
}

function adaptar(item) {
  const id = idDeUrl(item.url);
  return { id: id, nombre: item.name, imagen: `${IMAGENES}/${id}.png` };
}

// "mr-mime" -> "Mr Mime"
export function bonito(nombre) {
  return nombre
    .split('-')
    .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
    .join(' ');
}

// 25 -> "#025"
export function numero(id) {
  return '#' + String(id).padStart(3, '0');
}

// Una pagina de pokemon (20 por pagina)
export async function getPokemones(pagina = 1) {
  const desde = (pagina - 1) * TAMANO_PAGINA;
  const res = await pedir(`${BASE}/pokemon?limit=${TAMANO_PAGINA}&offset=${desde}`);

  if (!res) {
    return { hayMas: false, data: [] };
  }

  const data = res.results.map(adaptar).filter(p => p.id <= TOTAL);
  return { hayMas: res.next !== null && desde + TAMANO_PAGINA < TOTAL, data: data };
}

// Todos los pokemon de un tipo, guardados para no pedirlos de nuevo
const cachePorTipo = {};

export async function getPokemonesPorTipo(tipo) {
  if (cachePorTipo[tipo]) {
    return cachePorTipo[tipo];
  }

  const res = await pedir(`${BASE}/type/${tipo}`);
  if (!res) {
    return [];
  }

  const lista = res.pokemon
    .map(item => adaptar(item.pokemon))
    .filter(p => p.id <= TOTAL)
    .sort((a, b) => a.id - b.id);

  cachePorTipo[tipo] = lista;
  return lista;
}

// Los 18 tipos de pokemon
let cacheTipos = null;

export async function getTipos() {
  if (cacheTipos) {
    return cacheTipos;
  }

  const res = await pedir(`${BASE}/type`);
  if (!res) {
    return [];
  }

  const ocultos = ['unknown', 'stellar', 'shadow'];
  const tipos = res.results
    .filter(item => !ocultos.includes(item.name))
    .map(item => ({ id: item.name, nombre: item.name }));

  cacheTipos = tipos;
  return tipos;
}

// Ficha completa de un pokemon
const cacheDetalles = {};

export async function getDetalle(nombre) {
  if (cacheDetalles[nombre]) {
    return cacheDetalles[nombre];
  }

  const res = await pedir(`${BASE}/pokemon/${nombre}`);
  if (!res) {
    return null;
  }

  const detalle = {
    id: res.id,
    nombre: res.name,
    imagen: `${IMAGENES}/${res.id}.png`,
    altura: res.height / 10,
    peso: res.weight / 10,
    tipos: res.types.map(t => t.type.name),
    habilidades: res.abilities.map(a => a.ability.name),
    stats: res.stats.map(s => ({ nombre: s.stat.name, valor: s.base_stat })),
  };

  cacheDetalles[nombre] = detalle;
  return detalle;
}
