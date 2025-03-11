
import { Monitor, FileText, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Components = () => {
  const components = [
    {
      icon: <Monitor className="w-8 h-8" />,
      title: "Componente Territorial",
      description: "Permite obtener información relacionada a temas como el desarrollo productivo, el ordenamiento territorial, sistema del suelo, entre otros."
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Componente Administrativo Financiero",
      description: "Información relacionada con actividades de contabilidad, presupuesto, tesorería y otras de apoyo administrativo."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Componente Atención Ciudadana",
      description: "Conjunto de actividades y medios para facilitar el ejercicio de los derechos ciudadanos y el acceso a servicios públicos."
    }
  ];

  return (
    <section id="componentes" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">Componentes del Sistema</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {components.map((component, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-md transition-shadow fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-6 text-primary">{component.icon}</div>
              <h3 className="text-xl font-semibold mb-4">{component.title}</h3>
              <p className="text-gray-600">{component.description}</p>
              <Link 
                to="/resources"
                className="mt-6 text-primary font-medium hover:underline inline-block"
              >
                Ver recursos →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Components;
