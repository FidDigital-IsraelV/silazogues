
// Configuración para los diferentes tipos de visores

// URLs locales para los archivos GeoJSON
export const localGeoJSONUrls = {
  parroquias: "/src/data/mapas/parroquias.geojson",
  vias: "/src/data/mapas/vias.geojson",
  hidrografia: "/src/data/mapas/hidrografia.geojson",
  edificaciones: "/src/data/mapas/edificaciones.geojson",
  predios: "/src/data/mapas/predios.geojson",
  limiteUrbano: "/src/data/mapas/limite-urbano.geojson",
  plantasTratamiento: "/src/data/mapas/plantas-tratamiento.geojson",
  captaciones: "/src/data/mapas/captaciones.geojson",
  aducciones: "/src/data/mapas/aducciones.geojson",
  conducciones: "/src/data/mapas/conducciones.geojson",
  redAguaPotable: "/src/data/mapas/red-agua-potable.geojson"
};

// Estilos para las capas
export const layerStyles = {
  parroquias: {
    color: "#ff7800",
    weight: 2,
    opacity: 0.65,
    fillOpacity: 0.1
  },
  vias: {
    color: "#0078ff",
    weight: 3,
    opacity: 0.8
  },
  hidrografia: {
    color: "#0084ff",
    weight: 2,
    opacity: 0.8,
    fillColor: "#a3d2ff",
    fillOpacity: 0.5
  },
  edificaciones: {
    color: "#630460",
    weight: 1,
    opacity: 0.8,
    fillColor: "#9e72aa",
    fillOpacity: 0.4
  },
  predios: {
    color: "#ff5733",
    weight: 1,
    opacity: 0.8,
    fillColor: "#ffad99",
    fillOpacity: 0.3
  },
  limiteUrbano: {
    color: "#ffd700",
    weight: 3,
    opacity: 0.9,
    fillOpacity: 0.05
  },
  plantasTratamiento: {
    radius: 8,
    color: "#008000",
    weight: 1,
    opacity: 1,
    fillColor: "#00cc00",
    fillOpacity: 0.8
  },
  captaciones: {
    radius: 6,
    color: "#0000ff",
    weight: 1,
    opacity: 1,
    fillColor: "#4d4dff",
    fillOpacity: 0.8
  },
  aducciones: {
    color: "#8a2be2",
    weight: 3,
    opacity: 0.9
  },
  conducciones: {
    color: "#9932cc",
    weight: 2,
    opacity: 0.8
  },
  redAguaPotable: {
    color: "#4b0082",
    weight: 2,
    opacity: 0.8
  }
};

// Configuración de categorías y sus capas asociadas
export const mapCategories = [
  {
    id: "completo",
    name: "Visor Territorial Completo",
    layers: [
      { id: "parroquias", name: "Límites Parroquiales", defaultActive: true },
      { id: "vias", name: "Vías", defaultActive: false },
      { id: "hidrografia", name: "Hidrografía", defaultActive: false },
      { id: "edificaciones", name: "Catastro Edificaciones", defaultActive: false },
      { id: "predios", name: "Predios", defaultActive: false },
      { id: "limiteUrbano", name: "Límite Urbano", defaultActive: false },
      { id: "plantasTratamiento", name: "Plantas Tratamiento", defaultActive: false },
      { id: "captaciones", name: "Captaciones", defaultActive: false },
      { id: "aducciones", name: "Aducciones", defaultActive: false },
      { id: "conducciones", name: "Conducciones", defaultActive: false },
      { id: "redAguaPotable", name: "Red Agua Potable", defaultActive: false }
    ]
  },
  {
    id: "avaluos",
    name: "Avalúos y Catastros",
    layers: [
      { id: "predios", name: "Predios", defaultActive: true },
      { id: "edificaciones", name: "Edificaciones", defaultActive: true },
      { id: "limiteUrbano", name: "Límite Urbano", defaultActive: true },
      { id: "parroquias", name: "Límite Parroquial", defaultActive: true }
    ]
  },
  {
    id: "emapal",
    name: "EMAPAL",
    layers: [
      { id: "plantasTratamiento", name: "Plantas Tratamiento", defaultActive: true },
      { id: "captaciones", name: "Captaciones", defaultActive: true },
      { id: "aducciones", name: "Aducciones", defaultActive: true },
      { id: "conducciones", name: "Conducciones", defaultActive: true },
      { id: "redAguaPotable", name: "Red Agua Potable", defaultActive: true },
      { id: "limiteUrbano", name: "Límite Urbano", defaultActive: true },
      { id: "parroquias", name: "Límite Parroquial", defaultActive: true }
    ]
  }
];
