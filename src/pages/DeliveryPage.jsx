import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaTruck, 
  FaClock, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaShieldAlt, 
  FaMoneyBillWave,
  FaSyncAlt,
  FaExclamationTriangle,
  FaCheckCircle,
  FaBoxOpen,
  FaStar,
  FaCity
} from 'react-icons/fa';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const DeliveryPage = () => {
  // Bairros de Bissau
  const bissauNeighborhoods = [
    {
      zone: "Centro da Cidade",
      neighborhoods: ["Ajuda", "Bairro Militar", "Chão de Papel", "Central"],
      deliveryTime: "30-45 minutos"
    },
    {
      zone: "Zona Norte",
      neighborhoods: ["Bandim", "Enterramento", "Mindará", "Cuntum"],
      deliveryTime: "45-60 minutos"
    },
    {
      zone: "Zona Sul",
      neighborhoods: ["Antula", "Belém", "Bor", "Missirá"],
      deliveryTime: "45-60 minutos"
    },
    {
      zone: "Zona Oeste",
      neighborhoods: ["Bra", "Judené", "Mansoa", "Prabis"],
      deliveryTime: "60-75 minutos"
    },
    {
      zone: "Zona Leste",
      neighborhoods: ["Mendy", "Nhacra", "Penha", "Quelele"],
      deliveryTime: "60-75 minutos"
    },
    {
      zone: "Área Portuária",
      neighborhoods: ["Porto Pidjiguiti", "Santa Luzia", "Safim", "Mavego"],
      deliveryTime: "30-50 minutos"
    }
  ];

  // Termos e condições
  const termsAndConditions = [
    {
      title: "Política de Entrega",
      icon: <FaTruck />,
      items: [
        "Entregas gratuitas em toda a cidade de Bissau",
        "Horário de entrega: 08:00 - 20:00 (Segunda a Sábado)",
        "Entregas também disponíveis aos Domingos (09:00 - 14:00)",
        "Entregas sujeitas à disponibilidade de stock"
      ]
    },
    {
      title: "Política de Pagamento",
      icon: <FaMoneyBillWave />,
      items: [
        "Pagamento em dinheiro na entrega",
        "Pagamento por transferência bancária",
        "Aceitamos MBWay para clientes com conta portuguesa",
        "Pagamento móvel local disponível"
      ]
    },
    {
      title: "Política de Devoluções",
      icon: <FaSyncAlt />,
      items: [
        "15 dias para devolução de produtos não perecíveis",
        "Produtos devem estar na embalagem original e intactos",
        "Devolução do valor em dinheiro ou crédito na loja",
        "Produtos em promoção têm condições especiais"
      ]
    },
    {
      title: "Garantia e Suporte",
      icon: <FaShieldAlt />,
      items: [
        "Garantia de 12 meses em todas as peças novas",
        "Suporte técnico gratuito por telefone",
        "Assistência na instalação disponível para clientes regulares",
        "Certificado de autenticidade para peças originais"
      ]
    }
  ];

  // Horário de funcionamento
  const businessHours = [
    { day: "Segunda - Sexta", hours: "07:30 - 19:00" },
    { day: "Sábado", hours: "08:00 - 16:00" },
    { day: "Domingo", hours: "09:00 - 14:00" }
  ];

  // Vantagens do serviço
  const serviceBenefits = [
    {
      icon: <FaTruck className="text-success" />,
      title: "Entrega Gratuita",
      description: "Sem custos adicionais em toda Bissau"
    },
    {
      icon: <FaClock className="text-warning" />,
      title: "Entrega Rápida",
      description: "De 30 a 75 minutos conforme a localização"
    },
    {
      icon: <FaShieldAlt className="text-primary" />,
      title: "Peças Originais",
      description: "Garantia de qualidade e autenticidade"
    },
    {
      icon: <FaStar className="text-info" />,
      title: "Suporte Local",
      description: "Equipa especializada da região"
    }
  ];

  return (
    <>
    
    <Header/>
    <div className="min-vh-100 position-relative overflow-hidden" style={{ paddingTop: '80px' }}>
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

      <div className="container py-5 position-relative">
        {/* Header */}
        <div className="text-center mb-5">
          <div className="d-flex justify-content-center align-items-center mb-3">
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FaTruck size={32} color="white" />
            </div>
          </div>
          <h1 className="display-4 fw-bold text-white mb-3">
            Serviço de <span style={{ color: '#16f9db' }}>Entrega ao domicílio</span>
          </h1>
          <p className="lead text-light fs-5">
            Entregamos peças automóveis originais gratuitamente em toda a cidade!
          </p>
        </div>

        {/* Banner de Entrega Gratuita */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="card border-0 shadow-lg" style={{
              background: 'linear-gradient(135deg, rgba(22, 249, 219, 0.1) 0%, rgba(0, 123, 255, 0.1) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div className="card-body text-center py-4">
                <div className="row align-items-center">
                  <div className="col-lg-8">
                    <h3 className="text-white fw-bold mb-2">
                      🚚 Entrega Gratuita em Toda Bissau!
                    </h3>
                    <p className="text-light mb-0 fs-5">
                      Sem custos de entrega independentemente da sua localização na cidade
                    </p>
                  </div>
                  <div className="col-lg-4">
                    <div className="bg-success rounded-pill px-4 py-2 d-inline-block">
                      <h4 className="text-white mb-0 fw-bold">0 XOF</h4>
                      <small className="text-white">Custo de Entrega</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vantagens do Serviço */}
        <div className="row mb-5">
          {serviceBenefits.map((benefit, index) => (
            <div key={index} className="col-md-3 col-6 mb-4">
              <div className="text-center p-3 rounded-3" style={{ 
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                height: '100%'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                  {benefit.icon}
                </div>
                <h6 className="fw-bold text-white mb-2">{benefit.title}</h6>
                <small className="text-light">{benefit.description}</small>
              </div>
            </div>
          ))}
        </div>

    

        {/* Termos e Condições */}
        <div className="row mb-5">
          <div className="col-12">
            <h3 className="fw-bold mb-4 text-center text-white">
              <FaShieldAlt className="me-2 text-primary" />
              Termos e Condições da Loja
            </h3>
            <div className="row">
              {termsAndConditions.map((term, index) => (
                <div key={index} className="col-lg-6 mb-4">
                  <div className="card h-100 border-0 shadow-sm" style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <div className="card-header border-0 py-3" style={{
                      background: 'rgba(255, 255, 255, 0.05)'
                    }}>
                      <h5 className="mb-0 d-flex align-items-center text-white">
                        <span className="me-2 text-primary">{term.icon}</span>
                        {term.title}
                      </h5>
                    </div>
                    <div className="card-body">
                      <ul className="list-unstyled mb-0">
                        {term.items.map((item, i) => (
                          <li key={i} className="mb-2 d-flex align-items-start">
                            <FaCheckCircle className="text-success me-2 mt-1" size={14} />
                            <span className="text-light">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Informações Adicionais */}
        <div className="row">
          <div className="col-lg mb-4">
            <div className="card border-0 shadow-sm" style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div className="card-header border-0 py-3" style={{
                background: 'rgba(255, 255, 255, 0.05)'
              }}>
                <h5 className="mb-0 d-flex align-items-center text-white">
                  <FaExclamationTriangle className="me-2 text-warning" />
                  Informações Importantes
                </h5>
              </div>
              <div className="card-body">
                <div className="alert alert-warning mb-3" style={{
                  background: 'rgba(255, 193, 7, 0.1)',
                  border: '1px solid rgba(255, 193, 7, 0.3)',
                  color: '#ffc107'
                }}>
                  <strong>Atenção:</strong> Encomendas feitas após as 18:00 serão processadas no próximo dia.
                </div>
                <div className="alert alert-info mb-3" style={{
                  background: 'rgba(23, 162, 184, 0.1)',
                  border: '1px solid rgba(23, 162, 184, 0.3)',
                  color: '#17a2b8'
                }}>
                  <strong>Dica:</strong> Para entrega mais rápida, faça a encomenda até às 17:00.
                </div>
                <div className="alert alert-success" style={{
                  background: 'rgba(40, 167, 69, 0.1)',
                  border: '1px solid rgba(40, 167, 69, 0.3)',
                  color: '#28a745'
                }}>
                  <strong>Promoção:</strong> Clientes regulares têm prioridade nas entregas.
                </div>
              </div>
            </div>
          </div>

        </div>

       
      </div>

      <style jsx>{`
        .card {
          transition: transform 0.2s ease-in-out;
        }
        
        .card:hover {
          transform: translateY(-2px);
        }
        
        .table tbody tr:hover {
          background-color: rgba(255, 255, 255, 0.05) !important;
        }
        
        .badge {
          font-size: 0.75rem;
        }
        
        @media (max-width: 768px) {
          .display-4 {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
    <Footer/>
    </>
    
  );
};

export default DeliveryPage;