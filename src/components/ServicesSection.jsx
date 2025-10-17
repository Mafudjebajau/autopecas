import React from "react";
import {FaCheckCircle, FaCog, FaTools, FaCar, FaClipboardList} from "react-icons/fa";


const SERVICES = [
  {
    id: 1,
    title: "Venda de Peças",
    description: "Peças originais e compatíveis com garantia de procedência",
    icon: <FaCog size={32} />,
    features: ["Garantia estendida", "Entrega express", "Qualidade certificada"],
    color: "primary"
  },
  {
    id: 2,
    title: "Manutenção",
    description: "Serviços especializados em manutenção preventiva e corretiva",
    icon: <FaTools size={32} />,
    features: ["Troca de oleo", "Alinhamento", "Baleanceamento", "Revisao Geral"],
    color: "success"
  },
  {
    id: 3,
    title: "Reparos Especializados",
    description: "Reparos técnicos com equipamentos de última geração",
    icon: <FaCar size={32} />,
    features: ["Tecnologia avançada", "Garantia nos serviços", "Agilidade"],
    color: "warning"
  },
  {
    id: 4,
    title: "Consultoria Técnica",
    description: "Assessoria técnica personalizada para seu veículo",
    icon: <FaClipboardList size={32} />,
    features: ["Análise detalhada", "Orientações precisas", "Soluções customizadas"],
    color: "info"
  }
];

export const ServicesSection = React.memo(() => (
  <section id="services" className="py-4 pb-5 bg-w">
    <div className="container">
      <div className="text-center mb-5">
        <span className="badge bg-primary text-white px-4 py-2 rounded-pill fw-semibold mb-3">
          Serviços
        </span>
        <h2 className="fw-bold display-5 mb-3 text-light">Excelência em Cada <span className="text-primary">Detalhe</span> </h2>
        <p className="lead text-light mx-auto" style={{ maxWidth: "600px" }}>
          Soluções completas e personalizadas para todas as necessidades do seu veículo
        </p>
      </div>

      <div className="row g-4">
        {SERVICES.map((service) => (
          <div key={service.id} className="col-12 col-md-6 col-lg-3 px-4">
            <div className="service-card card border-0 h-100 text-center p-4 rounded-4" style={{ background: "#2f3c4e3e", backdropFilter: 'blur(100)', border: "1px solid #2f3c4e3e", boxShadow: " 2px 5px 5px #26252f " }}>
              <div className={`bg-${service.color} rounded-3 p-3 mx-auto mb-4`}>
                {service.icon}
              </div>
              <h5 className="fw-bold mb-3 text-light">{service.title}</h5>
              <p className="text-light mb-4">{service.description}</p>
              <ul className="list-unstyled text-start">
                {service.features.map((feature, index) => (
                  <li key={index} className="mb-2">
                    <small className="text-light fs-6 fw-bold">
                      <FaCheckCircle className="text-success me-2" />
                      {feature}
                    </small>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>

    <style jsx>{`
      .service-card {
        transition: all 0.3s ease;
      }
      
      .service-card:hover {
        transform: scale(1.2,1.2);
      }
    `}</style>
  </section>
));
