
import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { toast } from "@/components/ui/use-toast";
import { wmsLayerUrls, mapCategories } from "@/utils/mapConfig";
import MapControls from "./MapControls";
import MapLegend from "./MapLegend";
import "leaflet/dist/leaflet.css";
import { Layers } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface MapViewerProps {
  activeCategory: string;
  activeLayers: Record<string, boolean>;
  setActiveLayers: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

const MapViewer = ({ activeCategory, activeLayers, setActiveLayers }: MapViewerProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const wmsLayersRef = useRef<Record<string, L.TileLayer.WMS>>({});
  const baseLayersRef = useRef<Record<string, L.TileLayer>>({});
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  
  // Initialize the map when the component mounts
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

  // Handle changes to active layers
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;
    
    // Update the visibility of each layer based on the activeLayers state
    Object.entries(wmsLayersRef.current).forEach(([id, layer]) => {
      if (activeLayers[id]) {
        if (!mapRef.current?.hasLayer(layer)) {
          mapRef.current.addLayer(layer);
        }
      } else {
        if (mapRef.current?.hasLayer(layer)) {
          mapRef.current.removeLayer(layer);
        }
      }
    });
  }, [activeLayers, mapLoaded]);

  const initializeMap = () => {
    try {
      const mapContainer = document.getElementById('map-container');
      if (!mapContainer) return;

      if (mapRef.current) {
        mapRef.current.remove();
      }
      mapContainer.innerHTML = '';
      
      const map = L.map('map-container', {
        center: [-2.739854107808339, -78.84742348127867],
        zoom: 14,
        zoomControl: false
      });
      
      mapRef.current = map;

      // Base layers
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

      // Initialize WMS Layers
      Object.entries(wmsLayerUrls).forEach(([id, config]) => {
        if (!config.url || !config.layers) {
          console.warn(`Missing URL or layers config for ${id}`);
          return;
        }
        
        const wmsLayer = L.tileLayer.wms(config.url, {
          layers: config.layers,
          format: config.format || 'image/png',
          transparent: true
        });
        
        wmsLayersRef.current[id] = wmsLayer;
        
        // Add layer to map if it should be active by default for the current category
        if (activeLayers[id]) {
          wmsLayer.addTo(map);
        }
      });

      L.control.scale().addTo(map);

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

  const handleLayerToggle = (layerId: string) => {
    setActiveLayers(prev => ({
      ...prev,
      [layerId]: !prev[layerId]
    }));
  };

  // Get the currently active category's layers
  const currentCategoryLayers = mapCategories.find(cat => cat.id === activeCategory)?.layers || [];

  return (
    <div className="relative h-[calc(100vh-220px)] border border-gray-200">
      <div 
        id="map-container" 
        className="w-full h-full z-10"
      ></div>
      
      <MapControls mapRef={mapRef} />
      
      <div className="absolute top-4 left-4 z-20 bg-white p-3 rounded-md shadow-md max-h-[calc(100vh-300px)] overflow-y-auto">
        <div className="flex items-center gap-2 mb-2">
          <Layers size={18} className="text-red-600" />
          <h3 className="font-medium text-sm">Capas</h3>
        </div>
        <div className="space-y-2 text-sm">
          {currentCategoryLayers.map((layer) => (
            <div key={`layer-${layer.id}`} className="flex items-center gap-2">
              <Checkbox 
                id={`layer-${layer.id}`}
                checked={activeLayers[layer.id] || false}
                onCheckedChange={() => handleLayerToggle(layer.id)}
              />
              <label htmlFor={`layer-${layer.id}`} className="text-sm cursor-pointer">
                {layer.name}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <MapLegend activeCategory={activeCategory} activeLayers={activeLayers} />
    </div>
  );
};

export default MapViewer;
