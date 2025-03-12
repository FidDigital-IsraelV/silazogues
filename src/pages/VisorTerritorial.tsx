
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link, useParams } from "react-router-dom";
import { mapCategories } from "@/utils/mapConfig";
import CategorySelector from "@/components/mapViewer/CategorySelector";
import MapViewer from "@/components/mapViewer/MapViewer";

const VisorTerritorial = () => {
  const params = useParams();
  const [activeCategory, setActiveCategory] = useState<string>(params.category || "completo");
  const [showCategorySelector, setShowCategorySelector] = useState<boolean>(!params.category);
  const [activeLayers, setActiveLayers] = useState<Record<string, boolean>>({});
  
  // Initialize active layers based on current category
  useEffect(() => {
    const category = mapCategories.find(cat => cat.id === activeCategory);
    if (category) {
      const initialLayers: Record<string, boolean> = {};
      category.layers.forEach(layer => {
        initialLayers[layer.id] = layer.defaultActive;
      });
      setActiveLayers(initialLayers);
    }
  }, [activeCategory]);
  
  const selectCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    setShowCategorySelector(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 pt-20 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-full mx-auto">
          {showCategorySelector ? (
            <CategorySelector onSelectCategory={selectCategory} />
          ) : (
            <>
              <div className="px-4 sm:px-6 lg:px-8 py-4 bg-red-600 text-white flex justify-between items-center">
                <div>
                  <h1 className="text-xl font-bold">
                    {mapCategories.find(cat => cat.id === activeCategory)?.name || "Visor Territorial"}
                  </h1>
                  <p className="text-sm">Sistema de Información Geográfica Municipal</p>
                </div>
                <button 
                  onClick={() => setShowCategorySelector(true)}
                  className="bg-white text-red-600 px-3 py-1 rounded text-sm hover:bg-gray-100 transition-colors"
                >
                  Cambiar categoría
                </button>
              </div>
              
              <MapViewer 
                activeCategory={activeCategory}
                activeLayers={activeLayers}
                setActiveLayers={setActiveLayers}
              />
              
              <div className="px-4 sm:px-6 lg:px-8 py-4 bg-gray-100 text-sm text-gray-600">
                <p>Nota: Los datos mostrados en este visor son referenciales.</p>
              </div>
            </>
          )}
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
        `}
      </style>
    </div>
  );
};

export default VisorTerritorial;
