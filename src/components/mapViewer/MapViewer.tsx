
import React, { useEffect, useRef } from "react";
import L from "leaflet";
import { toast } from "@/components/ui/use-toast";
import { localGeoJSONUrls, layerStyles, mapCategories } from "@/utils/mapConfig";
import MapControls from "./MapControls";
import LayerPanel from "./LayerPanel";
import MapLegend from "./MapLegend";

interface MapViewerProps {
  activeCategory: string;
  activeLayers: Record<string, boolean>;
  setActiveLayers: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

const MapViewer = ({ activeCategory, activeLayers, setActiveLayers }: MapViewerProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const layersRef = useRef<Record<string, L.LayerGroup>>({});
  
  useEffect(() => {
    const loadDependencies = async () => {
      try {
        const leafletCss = document.createElement('link');
        leafletCss.rel = 'stylesheet';
        leafletCss.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        leafletCss.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
        leafletCss.crossOrigin = '';
        document.head.appendChild(leafletCss);
        
        initializeMap();
      } catch (error) {
        console.error("Error loading dependencies:", error);
        toast({
          title: "Error de inicialización",
          description: "No se pudo inicializar el visor territorial",
          variant: "destructive"
        });
      }
    };

    loadDependencies();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    
    // Ocultar todas las capas primero
    Object.values(layersRef.current).forEach(layer => {
      if (mapRef.current && layer) {
        mapRef.current.removeLayer(layer);
      }
    });
    
    // Mostrar solo las capas de la categoría actual que están activas
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
  }, [activeCategory, activeLayers]);

  const initializeMap = () => {
    try {
      const mapContainer = document.getElementById('map-container');
      if (!mapContainer) return;

      if (mapRef.current) {
        mapRef.current.remove();
      }
      mapContainer.innerHTML = '';
      
      const map = L.map('map-container', {
        center: [-2.8971, -78.9991],
        zoom: 13,
        zoomControl: false
      });
      
      mapRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      L.marker([-2.8971, -78.9991])
        .bindPopup('<strong>Azogues</strong><br>Cabecera cantonal')
        .addTo(map);

      // Initialize layers based on current category
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
      
      // Aplicar estilo específico según el tipo de capa
      const style = layerStyles[layerId as keyof typeof layerStyles];
      
      if (layerId === 'plantasTratamiento' || layerId === 'captaciones') {
        // Para puntos, usar circleMarker con el estilo adecuado que incluye radius
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
        // Para polígonos y líneas
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
