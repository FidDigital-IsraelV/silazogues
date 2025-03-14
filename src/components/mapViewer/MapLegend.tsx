
import React from "react";
import { mapCategories } from "@/utils/mapConfig";

interface MapLegendProps {
  activeCategory: string;
  activeLayers: Record<string, boolean>;
}

const MapLegend = ({ activeCategory, activeLayers }: MapLegendProps) => {
  const category = mapCategories.find(cat => cat.id === activeCategory);
  
  if (!category) return null;
  
  // Filter the layers to only show the ones that are currently active
  const visibleLayers = category.layers
    .filter(layer => activeLayers[layer.id])
    .map(layer => ({
      id: layer.id,
      name: layer.name
    }));

  if (visibleLayers.length === 0) {
    return null;
  }
  
  return (
    <div className="absolute bottom-4 right-4 z-20 bg-white p-3 rounded-md shadow-md max-w-xs overflow-y-auto">
      <h3 className="font-medium text-sm mb-2">Leyenda</h3>
      <div className="space-y-1 text-xs">
        {visibleLayers.map(layer => {
          // Determine what color to use for the legend item
          let color = "#000000"; // Default color
          
          if (layer.id.includes("plantas") || layer.id === "plantasTratamiento") {
            color = "#008000"; // Green for plants
          } else if (layer.id.includes("captaciones") || layer.id === "captaciones") {
            color = "#0000ff"; // Blue for water capture
          } else if (layer.id.includes("red") || layer.id === "redAguaPotable") {
            color = "#4b0082"; // Indigo for water network
          } else if (layer.id.includes("aducciones") || layer.id === "aducciones") {
            color = "#8a2be2"; // Blue-violet for adductions
          } else if (layer.id.includes("conducciones") || layer.id === "conducciones") {
            color = "#9932cc"; // Dark orchid for conductions
          } else if (layer.id.includes("limite") || layer.id === "limiteUrbano" || layer.id === "limiteParroquial") {
            color = "#ffd700"; // Gold for boundaries
          } else if (layer.id.includes("edificaciones") || layer.id === "edificaciones") {
            color = "#630460"; // Purple for buildings
          } else if (layer.id.includes("predios") || layer.id === "predios") {
            color = "#ff5733"; // Orange for properties
          } else if (layer.id.includes("vias") || layer.id === "vias") {
            color = "#0078ff"; // Blue for roads
          }
          
          // Determine the shape for the legend marker
          const isPoint = layer.id.includes("plantas") || layer.id.includes("captaciones") || 
                          layer.id === "plantasTratamiento" || layer.id === "captaciones";
          
          const isLine = layer.id.includes("red") || layer.id.includes("aducciones") || 
                         layer.id.includes("conducciones") || layer.id.includes("vias") ||
                         layer.id === "redAguaPotable" || layer.id === "aducciones" || 
                         layer.id === "conducciones" || layer.id === "vias";
          
          const isPolygon = layer.id.includes("limite") || layer.id.includes("edificaciones") || 
                            layer.id.includes("predios") || layer.id === "limiteUrbano" || 
                            layer.id === "limiteParroquial" || layer.id === "edificaciones" || 
                            layer.id === "predios";
          
          return (
            <div key={`legend-${layer.id}`} className="flex items-center gap-2">
              <div 
                className={`${isPoint ? 'w-4 h-4 rounded-full' : isLine ? 'w-6 h-1' : 'w-4 h-4 border'}`}
                style={{ 
                  backgroundColor: color,
                  borderColor: isPolygon ? color : undefined,
                  opacity: isPolygon ? 0.5 : 1
                }}
              ></div>
              <span>{layer.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MapLegend;
