
import { useState } from 'react';
import { Menu, X, MapPin, FileText, Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-3 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  AZ
                </div>
                <div className="h-10 w-1.5 bg-green-600 ml-1"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-red-600 leading-tight">
                  GAD Municipal
                </span>
                <span className="text-sm font-medium text-green-600 leading-tight">
                  Azogues
                </span>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center">
            <Link 
              to="/" 
              className={`px-4 py-2 text-sm font-medium transition-colors relative ${
                isActive('/') 
                  ? 'text-red-600' 
                  : 'text-gray-700 hover:text-red-600'
              }`}
            >
              {isActive('/') && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"></span>
              )}
              Inicio
            </Link>
            <Link 
              to="/resources" 
              className={`px-4 py-2 text-sm font-medium transition-colors flex items-center gap-1 relative ${
                isActive('/resources') 
                  ? 'text-red-600' 
                  : 'text-gray-700 hover:text-red-600'
              }`}
            >
              <FileText size={16} />
              Recursos
              {isActive('/resources') && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"></span>
              )}
            </Link>
            <Link 
              to="/visor-territorial" 
              className={`px-4 py-2 text-sm font-medium transition-colors flex items-center gap-1 relative ${
                isActive('/visor-territorial') 
                  ? 'text-red-600' 
                  : 'text-gray-700 hover:text-red-600'
              }`}
            >
              <MapPin size={16} />
              Visor Territorial
              {isActive('/visor-territorial') && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"></span>
              )}
            </Link>
            <a 
              href="#contacto" 
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors flex items-center gap-1"
            >
              <Mail size={16} />
              Contacto
            </a>
          </nav>

          <div className="hidden md:block">
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors">
              Iniciar Sesión
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} className="text-red-600" /> : <Menu size={24} className="text-red-600" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-b border-gray-200 shadow-md">
          <div className="px-4 py-2">
            <nav className="flex flex-col gap-1">
              <Link 
                to="/" 
                className={`flex items-center gap-2 py-3 px-2 rounded-md ${
                  isActive('/') 
                    ? 'bg-red-50 text-red-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link 
                to="/resources" 
                className={`flex items-center gap-2 py-3 px-2 rounded-md ${
                  isActive('/resources') 
                    ? 'bg-red-50 text-red-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <FileText size={16} />
                Recursos
              </Link>
              <Link 
                to="/visor-territorial" 
                className={`flex items-center gap-2 py-3 px-2 rounded-md ${
                  isActive('/visor-territorial') 
                    ? 'bg-red-50 text-red-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <MapPin size={16} />
                Visor Territorial
              </Link>
              <a 
                href="#contacto" 
                className="flex items-center gap-2 py-3 px-2 rounded-md text-gray-700 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                <Mail size={16} />
                Contacto
              </a>
              <div className="pt-2 pb-3">
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded text-sm font-medium transition-colors">
                  Iniciar Sesión
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
