
import { Mail, Phone, MapPin, Globe, Twitter, Facebook, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
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
            </div>
            <p className="text-sm text-gray-600">
              Plataforma oficial de información y recursos para la gestión municipal de Azogues.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4 text-gray-900">Secciones</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-red-600 transition-colors flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-sm text-gray-600 hover:text-red-600 transition-colors flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                  Recursos
                </Link>
              </li>
              <li>
                <Link to="/visor-territorial" className="text-sm text-gray-600 hover:text-red-600 transition-colors flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                  Visor Territorial
                </Link>
              </li>
              <li>
                <a href="#contacto" className="text-sm text-gray-600 hover:text-red-600 transition-colors flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                  Contacto
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4 text-gray-900" id="contacto">Contacto</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:+593072240077" className="text-sm text-gray-600 hover:text-red-600 transition-colors flex items-center gap-2">
                  <Phone size={16} className="text-red-600" />
                  (07) 224-0077
                </a>
              </li>
              <li>
                <a href="mailto:info@azogues.gob.ec" className="text-sm text-gray-600 hover:text-red-600 transition-colors flex items-center gap-2">
                  <Mail size={16} className="text-red-600" />
                  info@azogues.gob.ec
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-red-600 transition-colors flex items-center gap-2">
                  <MapPin size={16} className="text-red-600" />
                  Matovelle y Solano, Azogues
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-red-600 transition-colors flex items-center gap-2">
                  <Globe size={16} className="text-red-600" />
                  www.azogues.gob.ec
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4 text-gray-900">Síguenos</h4>
            <div className="flex gap-4">
              <a href="#" className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
            <div className="mt-6">
              <h4 className="font-medium mb-2 text-gray-900">Horario de atención</h4>
              <p className="text-sm text-gray-600">
                Lunes a Viernes<br />
                8:00 - 17:00
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t text-center text-sm text-gray-600">
          <p>© 2024 Gobierno Autónomo Descentralizado Municipal de Azogues. Todos los derechos reservados <a href="https://wa.me/+593995855756"> FIDDIGITAL.</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
