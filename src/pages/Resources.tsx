
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FileText, ExternalLink, Clock } from "lucide-react";

const Resources = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 pt-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="px-4 sm:px-6 lg:px-8 py-4 bg-red-600 text-white">
            <h1 className="text-2xl font-bold">Recursos del Sistema</h1>
            <p className="text-sm">Acceso a información y documentación municipal</p>
          </div>
          
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="border-b border-gray-200 p-4 bg-gray-50 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <FileText size={20} className="text-red-600" />
                  <h2 className="font-semibold">Sistema de Gestión de Recursos</h2>
                </div>
                <a 
                  href="http://143.198.234.95:5000" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-red-600 hover:text-red-700 text-sm flex items-center gap-1"
                >
                  Abrir en nueva ventana
                  <ExternalLink size={14} />
                </a>
              </div>
              
              <div className="w-full h-[calc(100vh-300px)] overflow-hidden">
                <iframe 
                  src="http://143.198.234.95:5000" 
                  className="w-full h-full border-0" 
                  title="Sistema de Recursos"
                  loading="lazy"
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                ></iframe>
              </div>
              
              <div className="border-t border-gray-200 p-4 bg-gray-50 text-sm text-gray-500 flex items-center gap-2">
                <Clock size={16} />
                <span>Última actualización: 15 de junio de 2024</span>
              </div>
            </div>
            
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-700">
              <p>
                <strong>Nota:</strong> Este sistema de recursos se carga desde un servidor externo. 
                Si tiene problemas para visualizar el contenido, intente acceder directamente desde 
                <a 
                  href="http://143.198.234.95:5000" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-700 underline mx-1"
                >
                  este enlace
                </a>.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;
