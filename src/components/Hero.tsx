
import { ArrowRight, Search, MapPin, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight fade-up text-red-600">
            Sistema de Información Local de <span className="text-green-600">Azogues</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto fade-up" style={{ animationDelay: '0.1s' }}>
            Navegue por los diferentes recursos disponibles en este repositorio del Municipio de Azogues
          </p>
          
          <div className="mt-10 fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="max-w-xl mx-auto flex items-center gap-2 bg-white rounded-lg shadow-sm border p-2">
              <Search size={20} className="ml-2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar recursos..."
                className="flex-1 px-4 py-2 outline-none text-sm"
              />
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md flex items-center gap-2 transition-colors">
                Buscar
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
          
          <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto fade-up" style={{ animationDelay: '0.3s' }}>
            <div className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-all group">
              <div className="w-16 h-16 flex items-center justify-center bg-red-100 text-red-600 rounded-full mx-auto mb-4 group-hover:bg-red-600 group-hover:text-white transition-colors">
                <FileText size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Recursos</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Acceda a toda la información y documentación disponible
              </p>
              <Link to="/resources" className="inline-flex items-center text-red-600 font-medium text-sm">
                Ver Recursos
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-all group">
              <div className="w-16 h-16 flex items-center justify-center bg-green-100 text-green-600 rounded-full mx-auto mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors">
                <MapPin size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Visor Territorial</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Explore el territorio municipal a través de mapas interactivos
              </p>
              <Link to="/visor-territorial" className="inline-flex items-center text-green-600 font-medium text-sm">
                Abrir Visor
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-all group">
              <div className="w-16 h-16 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mx-auto mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Search size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Indicadores</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Consulte indicadores y estadísticas municipales
              </p>
              <a href="#" className="inline-flex items-center text-blue-600 font-medium text-sm">
                Ver Indicadores
                <ArrowRight size={16} className="ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
