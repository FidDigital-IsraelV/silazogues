
import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { toast } from "@/components/ui/use-toast";
import { localGeoJSONUrls, layerStyles, mapCategories } from "@/utils/mapConfig";
import MapControls from "./MapControls";
import LayerPanel from "./LayerPanel";
import MapLegend from "./MapLegend";
import "leaflet/dist/leaflet.css";

interface MapViewerProps {
  activeCategory: string;
  activeLayers: Record<string, boolean>;
  setActiveLayers: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

const MapViewer = ({ activeCategory, activeLayers, setActiveLayers }: MapViewerProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const layersRef = useRef<Record<string, L.LayerGroup>>({});
  const wmsLayersRef = useRef<Record<string, L.TileLayer.WMS>>({});
  const baseLayersRef = useRef<Record<string, L.TileLayer>>({});
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  
  useEffect(() => {
    if (!document.querySelector('link[href*="leaflet.css"]')) {
      const leafletCss = document.createElement('link');
      leafletCss.rel = 'stylesheet';
      leafletCss.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      leafletCss.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
      leafletCss.crossOrigin = '';
      document.head.appendChild(leafletCss);
    }
    
    initializeMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;
    
    // Hide all GeoJSON layers first
    Object.values(layersRef.current).forEach(layer => {
      if (mapRef.current && layer) {
        mapRef.current.removeLayer(layer);
      }
    });
    
    // Only show layers from current category that are active
    const category = mapCategories.find(cat => cat.id === activeCategory);
    if (!category) return;
    
    category.layers.forEach(layer => {
      if (activeLayers[layer.id]) {
        if (!layersRef.current[layer.id]) {
          layersRef.current[layer.id] = L.layerGroup();
        }
        
        loadGeoJSON(layer.id);
        if (mapRef.current && layersRef.current[layer.id]) {
          mapRef.current.addLayer(layersRef.current[layer.id]);
        }
      }
    });
  }, [activeCategory, activeLayers, mapLoaded]);

  const initializeMap = () => {
    try {
      const mapContainer = document.getElementById('map-container');
      if (!mapContainer) return;

      if (mapRef.current) {
        mapRef.current.remove();
      }
      mapContainer.innerHTML = '';
      
      // Initialize map centered on Azogues
      const map = L.map('map-container', {
        center: [-2.740947, -78.848823],
        zoom: 12,
        zoomControl: false
      });
      
      mapRef.current = map;

      // Base tile layers
      const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);
      
      const esriWorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
      });
      
      const googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
      });
      
      const googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
      });

      baseLayersRef.current = {
        "OpenStreetMap": osm,
        "Google Streets": googleStreets,
        "Google Satellite": googleSat,
        "ESRI Imagery": esriWorldImagery
      };

      // WMS layers for cadastral data
      const prediosUrbi = L.tileLayer.wms("https://services.urbithings.com/geoserver/J9KxG17VrP/wms?", {
        layers: '88726a43-c5cc-4750-b556-ef6549e14254',
        format: 'image/png',
        transparent: true
      });
      
      const prediosLocal = L.tileLayer.wms("https://ide.azogues.gob.ec/gs/ide/wms?", {
        layers: 'pr_canton',
        format: 'image/png',
        transparent: true
      });
      
      const edificacionesUrbi = L.tileLayer.wms("https://services.urbithings.com/geoserver/J9KxG17VrP/wms?", {
        layers: '507dd439-bb23-40a9-85e8-d925404ab413',
        format: 'image/png',
        transparent: true
      });
      
      const edificacionesLocal = L.tileLayer.wms("https://ide.azogues.gob.ec/gs/ide/wms?", {
        layers: 'Edificaciones',
        format: 'image/png',
        transparent: true
      });
      
      const limiteParroquialUrbi = L.tileLayer.wms("https://services.urbithings.com/geoserver/J9KxG17VrP/wms?", {
        layers: 'fd03ffe7-8717-423d-9771-34e99b2df1a1',
        format: 'image/png',
        transparent: true
      }).addTo(map);
      
      const limiteParroquial = L.tileLayer.wms("https://ide.azogues.gob.ec/gs/sil/wms?", {
        layers: 'B002_LIMITE_PARROQUIAL_A',
        format: 'image/png',
        transparent: true
      }).addTo(map);
      
      const limiteUrbUrbi = L.tileLayer.wms("https://services.urbithings.com/geoserver/J9KxG17VrP/wms?", {
        layers: 'b2222f50-82e4-496f-982c-f463917611c4',
        format: 'image/png',
        transparent: true
      }).addTo(map);
      
      const limiteUrb = L.tileLayer.wms("https://ide.azogues.gob.ec/gs/ide/wms?", {
        layers: 'Suelo_Urbano_2022_PUGS',
        format: 'image/png',
        transparent: true
      }).addTo(map);

      wmsLayersRef.current = {
        "Predios (Urbi)": prediosUrbi,
        "Predios (Local)": prediosLocal,
        "Edificaciones (Urbi)": edificacionesUrbi,
        "Edificaciones (Local)": edificacionesLocal,
        "Límite Parroquial (Urbi)": limiteParroquialUrbi,
        "Límite Parroquial (Local)": limiteParroquial,
        "Límite Urbano (Urbi)": limiteUrbUrbi,
        "Límite Urbano (Local)": limiteUrb
      };

      // Add scale control and marker
      L.control.scale().addTo(map);
      L.marker([-2.738565, -78.846760], { draggable: true }).addTo(map);

      // Add layer control
      L.control.layers(baseLayersRef.current, wmsLayersRef.current, {
        position: "topright",
        collapsed: false
      }).addTo(map);

      // Initialize GeoJSON layers
      const category = mapCategories.find(cat => cat.id === activeCategory);
      if (category) {
        category.layers.forEach(layer => {
          if (activeLayers[layer.id]) {
            layersRef.current[layer.id] = L.layerGroup();
            loadGeoJSON(layer.id);
            map.addLayer(layersRef.current[layer.id]);
          }
        });
      }

      setMapLoaded(true);
      
      toast({
        title: "Visor cargado correctamente",
        description: "El visor territorial se ha inicializado con éxito.",
      });
    } catch (error) {
      console.error("Error initializing map:", error);
      toast({
        title: "Error al inicializar el mapa",
        description: "Ocurrió un problema al crear el visor territorial.",
        variant: "destructive"
      });
    }
  };

  const loadGeoJSON = async (layerId: string) => {
    try {
      const url = localGeoJSONUrls[layerId as keyof typeof localGeoJSONUrls];
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!layersRef.current[layerId]) {
        layersRef.current[layerId] = L.layerGroup();
      } else {
        layersRef.current[layerId].clearLayers();
      }
      
      // Apply specific style according to layer type
      const style = layerStyles[layerId as keyof typeof layerStyles];
      
      if (layerId === 'plantasTratamiento' || layerId === 'captaciones') {
        // For points, use circleMarker with appropriate style including radius
        const pointStyle = style as L.CircleMarkerOptions;
        
        L.geoJSON(data, {
          pointToLayer: (feature, latlng) => {
            return L.circleMarker(latlng, pointStyle);
          },
          onEachFeature: (feature, layer) => {
            if (feature.properties) {
              const popupContent = Object.entries(feature.properties)
                .map(([key, value]) => `<strong>${key}:</strong> ${value}`)
                .join('<br>');
              
              layer.bindPopup(popupContent);
            }
          }
        }).addTo(layersRef.current[layerId]);
      } else {
        // For polygons and lines
        L.geoJSON(data, {
          style: style,
          onEachFeature: (feature, layer) => {
            if (feature.properties) {
              const popupContent = Object.entries(feature.properties)
                .map(([key, value]) => `<strong>${key}:</strong> ${value}`)
                .join('<br>');
              
              layer.bindPopup(popupContent);
            }
          }
        }).addTo(layersRef.current[layerId]);
      }
      
      console.log(`Capa ${layerId} cargada con ${layersRef.current[layerId].getLayers().length} elementos`);
    } catch (error) {
      console.error(`Error loading ${layerId} GeoJSON:`, error);
      toast({
        title: `Error al cargar ${layerId}`,
        description: "No se pudo cargar la información geográfica.",
        variant: "destructive"
      });
    }
  };

  const handleLayerToggle = (layerId: string) => {
    if (!mapRef.current) return;
    
    const newState = !activeLayers[layerId];
    
    if (newState) {
      // Ensure the layer exists before trying to add it
      if (!layersRef.current[layerId]) {
        layersRef.current[layerId] = L.layerGroup();
        loadGeoJSON(layerId);
      }
      mapRef.current.addLayer(layersRef.current[layerId]);
    } else {
      // Check if the layer exists before trying to remove it
      if (layersRef.current[layerId]) {
        mapRef.current.removeLayer(layersRef.current[layerId]);
      }
    }
    
    setActiveLayers({
      ...activeLayers,
      [layerId]: newState
    });
  };

  return (
    <div className="relative h-[calc(100vh-220px)] border border-gray-200">
      <div 
        id="map-container" 
        className="w-full h-full z-10"
      ></div>
      
      <MapControls mapRef={mapRef} />
      <LayerPanel 
        activeCategory={activeCategory} 
        activeLayers={activeLayers} 
        onLayerToggle={handleLayerToggle} 
      />
      <MapLegend activeCategory={activeCategory} activeLayers={activeLayers} />
    </div>
  );
};

export default MapViewer;
