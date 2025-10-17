import React from "react";
import {
  FaShieldAlt,
  FaHeadset,
  FaShippingFast,
  FaAward
} from "react-icons/fa";



const FEATURES = [
  {
    icon: <FaShippingFast size={28} />,
    title: "Entrega ao Domicílio",
    description: "Entregas gratuitas em Bissau",
    stat: "24h"
  },
  {
    icon: <FaAward size={28} />,
    title: "Qualidade Indubitável",
    description: "Peças com certificado de autenticidade e garantia",
    stat: "100%"
  },
  {
    icon: <FaHeadset size={28} />,
    title: "Serviços de Excelência",
    description: "Equipe técnica especializada",
    stat: "24/7"
  },
  {
    icon: <FaShieldAlt size={28} />,
    title: "Produtos Autênticos",
    description: "Produtos originais e de qualidade!",
    stat: "Seguros"
  }
];



export const FeaturesSection = React.memo(() => (

  <section id="marcas" className="p-4 position-relative overflow-hidden">
    {/* Background com gradiente dinâmico */}
    <div className="position-absolute top-0 start-0 w-100 h-100">
      <div
        className="w-100 h-100"
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
        }}
      />

      {/* Grid animado */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
          backgroundSize: '50px 50px'
        }}
      />
    </div>

    <div className=" position-relative text-light py-2">
      <div className="text-center mb-5">
        <h2 className="fw-bold display-5 mb-3">Por que nos <span className="text-primary">escolher? </span></h2>
        <p className="lead text-light mx-auto" style={{ maxWidth: "600px" }}>
          Combinamos qualidade, tecnologia e atendimento para a melhor experiência
        </p>
      </div>

      <div className="row g-4">
        {FEATURES.map((feature, index) => (
          <div key={index} className="col-12 col-md-6 col-lg-3 text-center">
            <div className="feature-card p-4  h-100 rounded " style={{ background: "#2f3c4e3e", backdropFilter: 'blur(100)', border: "1px solid #2f3c4e3e", boxShadow: " 2px 5px 5px #26252f " }}>
              <div className="text-primary mb-3">
                {feature.icon}
              </div>
              <h5 className="fw-bold mb-3">{feature.title}</h5>
              <p className="text-light mb-0">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
));