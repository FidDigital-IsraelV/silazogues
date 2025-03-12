
import React from "react";
import { Layers } from "lucide-react";
import { mapCategories } from "@/utils/mapConfig";

interface LayerPanelProps {
  activeCategory: string;
  activeLayers: Record<string, boolean>;
  onLayerToggle: (layerId: string) => void;
}

const LayerPanel = ({ activeCategory, activeLayers, onLayerToggle }: LayerPanelProps) => {
  const category = mapCategories.find(cat => cat.id === activeCategory);
  
  if (!category) return null;
  
  return (
    <div className="absolute top-4 left-4 z-20 bg-white p-3 rounded-md shadow-md max-h-[calc(100vh-300px)] overflow-y-auto">
      <div className="flex items-center gap-2 mb-2">
        <Layers size={18} className="text-red-600" />
        <h3 className="font-medium text-sm">Capas</h3>
      </div>
      <div className="space-y-2 text-sm">
        {category.layers.map(layer => (
          <div key={layer.id} className="flex items-center">
            <input 
              type="checkbox" 
              id={`layer-${layer.id}`}
              className="mr-2"
              checked={!!activeLayers[layer.id]}
              onChange={() => onLayerToggle(layer.id)}
            />
            <label htmlFor={`layer-${layer.id}`}>{layer.name}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LayerPanel;
