
import React from "react";
import { Link } from "react-router-dom";
import { Database } from "lucide-react";
import { mapCategories } from "@/utils/mapConfig";

interface CategorySelectorProps {
  onSelectCategory: (categoryId: string) => void;
}

const CategorySelector = ({ onSelectCategory }: CategorySelectorProps) => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Repositorio de Mapas</h1>
        <p className="text-gray-600 mt-2">Seleccione la categoría de mapas que desea visualizar</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mapCategories.map((category) => (
          <div 
            key={category.id}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onSelectCategory(category.id)}
          >
            <div className="p-6 flex items-start gap-4">
              <div className="bg-red-600 p-3 rounded-lg">
                <Database className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {category.layers.length} capas disponibles
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <Link to="/" className="text-red-600 hover:text-red-700 text-sm">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default CategorySelector;
