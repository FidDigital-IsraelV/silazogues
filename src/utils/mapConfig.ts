
// Configuración para los diferentes tipos de visores

// URLs locales para los archivos GeoJSON (mantenemos estos para compatibilidad)
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
  limiteParroquial: {
    color: "#ff7800",
    weight: 2,
    opacity: 0.8,
    fillOpacity: 0.1
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

// URLs de servicios WMS
export const wmsLayerUrls = {
  // EMAPAL WMS layers from Urbithings
  plantasTratamiento: {
    url: "https://services.urbithings.com/geoserver/J9KxG17VrP/wms?",
    layers: "62f3461a-f7fa-4573-bd25-3ff6e782b1d8",
    format: 'image/png',
    transparent: true
  },
  captaciones: {
    url: "https://services.urbithings.com/geoserver/J9KxG17VrP/wms?",
    layers: "d25ae259-5821-431c-b7b4-20113e44524d",
    format: 'image/png',
    transparent: true
  },
  aducciones: {
    url: "https://services.urbithings.com/geoserver/J9KxG17VrP/wms?",
    layers: "0988eef0-5a1b-4d5e-a40e-36f4ef21cc91",
    format: 'image/png',
    transparent: true
  },
  conducciones: {
    url: "https://services.urbithings.com/geoserver/J9KxG17VrP/wms?",
    layers: "588af586-49c0-4b85-bb09-55dfd171df4b",
    format: 'image/png',
    transparent: true
  },
  redAguaPotable: {
    url: "https://services.urbithings.com/geoserver/J9KxG17VrP/wms?",
    layers: "2090bf23-b8bc-4f35-a14a-1ee159ac0c25",
    format: 'image/png',
    transparent: true
  },
  // Boundary layers
  limiteParroquial: {
    url: "https://services.urbithings.com/geoserver/J9KxG17VrP/wms?",
    layers: "fd03ffe7-8717-423d-9771-34e99b2df1a1",
    format: 'image/png',
    transparent: true
  },
  limiteUrbano: {
    url: "https://services.urbithings.com/geoserver/J9KxG17VrP/wms?",
    layers: "b2222f50-82e4-496f-982c-f463917611c4",
    format: 'image/png',
    transparent: true
  },
  // Catastro WMS layers - Fixed URLs and layer names
  edificaciones: {
    url: "https://services.urbithings.com/geoserver/J9KxG17VrP/wms?",
    layers: "507dd439-bb23-40a9-85e8-d925404ab413",
    format: 'image/png',
    transparent: true
  },
  predios: {
    url: "https://services.urbithings.com/geoserver/J9KxG17VrP/wms?",
    layers: "88726a43-c5cc-4750-b556-ef6549e14254",
    format: 'image/png',
    transparent: true
  },
  vias: {
    url: "https://ide.azogues.gob.ec/gs/ide/wms?",
    layers: "V001_VIAS_L",
    format: 'image/png',
    transparent: true
  }
};

// Configuración de categorías y sus capas asociadas
export const mapCategories = [
  {
    id: "completo",
    name: "Visor Territorial Completo",
    layers: [
      { id: "limiteParroquial", name: "Límite Parroquial", defaultActive: true },
      { id: "limiteUrbano", name: "Límite Urbano", defaultActive: true },
      { id: "plantasTratamiento", name: "Plantas Tratamiento", defaultActive: true },
      { id: "captaciones", name: "Captaciones", defaultActive: true },
      { id: "aducciones", name: "Aducciones", defaultActive: true },
      { id: "conducciones", name: "Conducciones", defaultActive: true },
      { id: "redAguaPotable", name: "Red Agua Potable", defaultActive: true },
      { id: "edificaciones", name: "Edificaciones", defaultActive: true },
      { id: "predios", name: "Predios", defaultActive: true },
      { id: "vias", name: "Vías", defaultActive: true }
    ]
  },
  {
    id: "catastro",
    name: "Catastro",
    layers: [
      { id: "limiteParroquial", name: "Límite Parroquial", defaultActive: true },
      { id: "limiteUrbano", name: "Límite Urbano", defaultActive: true },
      { id: "edificaciones", name: "Edificaciones", defaultActive: true },
      { id: "predios", name: "Predios", defaultActive: true },
      { id: "vias", name: "Vías", defaultActive: true }
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
      { id: "limiteParroquial", name: "Límite Parroquial", defaultActive: true }
    ]
  }
];

