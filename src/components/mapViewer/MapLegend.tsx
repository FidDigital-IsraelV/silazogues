
import React from "react";
import { mapCategories, layerStyles } from "@/utils/mapConfig";

interface MapLegendProps {
  activeCategory: string;
  activeLayers: Record<string, boolean>;
}

const MapLegend = ({ activeCategory, activeLayers }: MapLegendProps) => {
  const category = mapCategories.find(cat => cat.id === activeCategory);
  
  if (!category) return null;
  
  return (
    <div className="absolute bottom-4 left-4 z-20 bg-white p-3 rounded-md shadow-md max-w-xs overflow-y-auto">
      <h3 className="font-medium text-sm mb-2">Leyenda</h3>
      <div className="space-y-1 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-600"></div>
          <span>Cabecera cantonal</span>
        </div>
        {category.layers
          .filter(layer => activeLayers[layer.id])
          .map(layer => {
            const style = layerStyles[layer.id as keyof typeof layerStyles];
            const isPoint = layer.id === 'plantasTratamiento' || layer.id === 'captaciones';
            const isPolygon = layer.id === 'parroquias' || layer.id === 'limiteUrbano' || 
                              layer.id === 'edificaciones' || layer.id === 'predios' || 
                              layer.id === 'hidrografia';
            
            // Create a safe type check before accessing properties
            const getColor = () => {
              if (isPolygon && 'fillColor' in style) {
                return style.fillColor || style.color;
              }
              return style.color;
            };
            
            const getOpacity = () => {
              if (isPolygon && 'fillOpacity' in style) {
                return style.fillOpacity;
              }
              return 0.5;
            };
            
            return (
              <div key={`legend-${layer.id}`} className="flex items-center gap-2">
                <div 
                  className={`w-4 h-4 ${isPoint ? 'rounded-full' : isPolygon ? 'border' : ''}`}
                  style={{ 
                    backgroundColor: getColor(),
                    borderColor: style.color,
                    opacity: getOpacity()
                  }}
                ></div>
                <span>{layer.name}</span>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default MapLegend;
