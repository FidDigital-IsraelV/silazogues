
const Information = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="fade-up">
            <img 
              src="/lovable-uploads/4097ee99-319b-4152-a984-a0ccabdf293f.png"
              alt="Sistema de Información Local"
              className="w-full h-auto"
            />
          </div>
          <div className="fade-up" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-3xl font-bold mb-6">Sistema de Información Local</h2>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Concepto y finalidad</h3>
              <p className="text-gray-600 leading-relaxed">
                El Sistema de Información Local es el conjunto organizado y
                sistemático de elementos, competencias técnicas y administrativas,
                talento humano, medios técnicos, procedimientos en general;
                productos informativos que permiten la interacción de los
                Gobiernos Autónomos Descentralizados con la ciudadanía en el
                territorio, en el marco de la rendición de cuentas y control social;
                para acceder, recoger, almacenar, transformar y difundir datos e
                información relevante para la planificación.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Information;
