import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Layers, MapPin, Maximize, ZoomIn, ZoomOut } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import L from "leaflet";

const VisorTerritorial = () => {
  const mapRef = useRef<L.Map | null>(null);
  const layersRef = useRef<{
    parroquias: L.LayerGroup;
    vias: L.LayerGroup;
    hidrografia: L.LayerGroup;
    catastro: L.LayerGroup;
  }>({
    parroquias: L.layerGroup(),
    vias: L.layerGroup(),
    hidrografia: L.layerGroup(),
    catastro: L.layerGroup()
  });
  
  const geoJSONUrls = {
    parroquias: "https://raw.githubusercontent.com/FidDigital-IsraelV/geoportal/main/static/data/parroquias.geojson",
    vias: "https://raw.githubusercontent.com/FidDigital-IsraelV/geoportal/main/static/data/vias.geojson",
    hidrografia: "https://raw.githubusercontent.com/FidDigital-IsraelV/geoportal/main/static/data/hidrografia.geojson",
    catastro: "https://raw.githubusercontent.com/FidDigital-IsraelV/geoportal/main/static/data/edificaciones.geojson"
  };
  
  const layerStyles = {
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
    catastro: {
      color: "#630460",
      weight: 1,
      opacity: 0.8,
      fillColor: "#9e72aa",
      fillOpacity: 0.4
    }
  };
  
  useEffect(() => {
    const loadScript = (src: string, id: string) => {
      return new Promise((resolve, reject) => {
        if (document.getElementById(id)) {
          resolve(true);
          return;
        }
        
        const script = document.createElement('script');
        script.src = src;
        script.id = id;
        script.onload = resolve;
        script.onerror = () => {
          reject(new Error(`Failed to load script: ${src}`));
          toast({
            title: "Error al cargar el mapa",
            description: "No se pudo cargar el visor territorial. Intente recargar la página.",
            variant: "destructive"
          });
        };
        document.body.appendChild(script);
      });
    };

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

    const loadGeoJSON = async (url: string, layerKey: keyof typeof layersRef.current, style: any) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        layersRef.current[layerKey].clearLayers();
        
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
        }).addTo(layersRef.current[layerKey]);
        
        if (layersRef.current[layerKey].getLayers().length > 0) {
          toast({
            title: "Capa cargada",
            description: `La capa ${layerKey} se ha cargado correctamente.`
          });
        }
      } catch (error) {
        console.error(`Error loading ${layerKey} GeoJSON:`, error);
        toast({
          title: `Error al cargar ${layerKey}`,
          description: "No se pudo cargar la información geográfica.",
          variant: "destructive"
        });
      }
    };

    const initializeMap = () => {
      try {
        const mapContainer = document.getElementById('map-container');
        if (!mapContainer) return;

        if (mapRef.current) {
          mapRef.current.remove();
        }
        mapContainer.innerHTML = '';
        
        const map = L.map('map-container', {
          center: [-2.7407060072851244, -78.84888217001733],
          zoom: 13,
          zoomControl: false
        });
        
        mapRef.current = map;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        layersRef.current.parroquias = L.layerGroup().addTo(map);
        layersRef.current.vias = L.layerGroup();
        layersRef.current.hidrografia = L.layerGroup();
        layersRef.current.catastro = L.layerGroup();
        
        loadGeoJSON(geoJSONUrls.parroquias, 'parroquias', layerStyles.parroquias);

        document.getElementById('zoom-in')?.addEventListener('click', () => {
          map.zoomIn();
        });
        
        document.getElementById('zoom-out')?.addEventListener('click', () => {
          map.zoomOut();
        });
        
        document.getElementById('full-extent')?.addEventListener('click', () => {
          map.setView([-2.7407060072851244, -78.84888217001733], 13);
        });

        document.getElementById('layer1')?.addEventListener('change', (e) => {
          const target = e.target as HTMLInputElement;
          if (target.checked) {
            loadGeoJSON(geoJSONUrls.parroquias, 'parroquias', layerStyles.parroquias);
            map.addLayer(layersRef.current.parroquias);
          } else {
            map.removeLayer(layersRef.current.parroquias);
          }
        });
        
        document.getElementById('layer2')?.addEventListener('change', (e) => {
          const target = e.target as HTMLInputElement;
          if (target.checked) {
            loadGeoJSON(geoJSONUrls.vias, 'vias', layerStyles.vias);
            map.addLayer(layersRef.current.vias);
          } else {
            map.removeLayer(layersRef.current.vias);
          }
        });
        
        document.getElementById('layer3')?.addEventListener('change', (e) => {
          const target = e.target as HTMLInputElement;
          if (target.checked) {
            loadGeoJSON(geoJSONUrls.hidrografia, 'hidrografia', layerStyles.hidrografia);
            map.addLayer(layersRef.current.hidrografia);
          } else {
            map.removeLayer(layersRef.current.hidrografia);
          }
        });
        
        document.getElementById('layer4')?.addEventListener('change', (e) => {
          const target = e.target as HTMLInputElement;
          if (target.checked) {
            loadGeoJSON(geoJSONUrls.catastro, 'catastro', layerStyles.catastro);
            map.addLayer(layersRef.current.catastro);
          } else {
            map.removeLayer(layersRef.current.catastro);
          }
        });

        L.marker([-2.7407060072851244, -78.84888217001733])
          .bindPopup('<strong>Azogues</strong><br>Cabecera cantonal')
          .addTo(map);

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

    loadDependencies();

    return () => {
      document.getElementById('zoom-in')?.removeEventListener('click', () => {});
      document.getElementById('zoom-out')?.removeEventListener('click', () => {});
      document.getElementById('full-extent')?.removeEventListener('click', () => {});
      document.getElementById('layer1')?.removeEventListener('change', () => {});
      document.getElementById('layer2')?.removeEventListener('change', () => {});
      document.getElementById('layer3')?.removeEventListener('change', () => {});
      document.getElementById('layer4')?.removeEventListener('change', () => {});
      
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 pt-20 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-full mx-auto">
          <div className="px-4 sm:px-6 lg:px-8 py-4 bg-red-600 text-white">
            <h1 className="text-2xl font-bold">Visor Territorial</h1>
            <p className="text-sm">Sistema de Información Geográfica Municipal</p>
          </div>
          
          <div className="relative h-[calc(100vh-220px)] border border-gray-200">
            <div 
              id="map-container" 
              className="w-full h-full z-10"
            ></div>
            
            <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
              <button id="zoom-in" className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                <ZoomIn size={20} className="text-gray-700" />
              </button>
              <button id="zoom-out" className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                <ZoomOut size={20} className="text-gray-700" />
              </button>
              <button id="full-extent" className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                <Maximize size={20} className="text-gray-700" />
              </button>
            </div>
            
            <div className="absolute top-4 left-4 z-20 bg-white p-3 rounded-md shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <Layers size={18} className="text-red-600" />
                <h3 className="font-medium text-sm">Capas</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <input type="checkbox" id="layer1" className="mr-2" defaultChecked />
                  <label htmlFor="layer1">Límites Parroquiales</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="layer2" className="mr-2" />
                  <label htmlFor="layer2">Vías</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="layer3" className="mr-2" />
                  <label htmlFor="layer3">Hidrografía</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="layer4" className="mr-2" />
                  <label htmlFor="layer4">Catastro Edificaciones</label>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-4 left-4 z-20 bg-white p-3 rounded-md shadow-md">
              <h3 className="font-medium text-sm mb-2">Leyenda</h3>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-600"></div>
                  <span>Cabecera cantonal</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3" style={{ backgroundColor: "#ff7800" }}></div>
                  <span>Límites Parroquiales</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3" style={{ backgroundColor: "#0078ff" }}></div>
                  <span>Vías</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3" style={{ backgroundColor: "#0084ff" }}></div>
                  <span>Hidrografía</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3" style={{ backgroundColor: "#630460" }}></div>
                  <span>Catastro Edificaciones</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="px-4 sm:px-6 lg:px-8 py-4 bg-gray-100 text-sm text-gray-600">
            <p>Nota: Los datos mostrados en este visor son referenciales.</p>
          </div>
        </div>
      </main>
      <Footer />
      
      <style>
        {`
          #map-container {
            background-color: #f5f5f5;
          }
          .leaflet-control-attribution {
            font-size: 10px;
          }
          .custom-map-controls {
            position: absolute;
            bottom: 10px;
            right: 10px;
            z-index: 1000;
          }
        `}
      </style>
    </div>
  );
};

export default VisorTerritorial;
