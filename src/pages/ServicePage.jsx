import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { 
  FaTools, 
  FaCar, 
  FaClipboardList, 
  FaCheckCircle, 
  FaClock, 
  FaUsers,
  FaCog,
  FaStar,
  FaOilCan,
  FaWrench,
  FaCarCrash,
  FaCogs,
  FaListAlt,
  FaPhone,
  FaEnvelope
} from "react-icons/fa";

const SERVICES = [
  {
    id: 1,
    name: "Manutenção",
    icon: <FaTools size={16} />,
    subservices: [
      {
        name: "Mudança de Óleo",
        description: "Substituição completa de óleo do motor e filtro para garantir o melhor desempenho do seu veículo",
        icon: <FaOilCan />,
        duration: "30-45 minutos",
        benefits: ["Óleo de alta qualidade", "Filtro novo incluído", "Verificação de nível", "Serviço profissional"]
      },
      {
        name: "Alinhamento",
        description: "Alinhamento de direção preciso para melhor estabilidade e durabilidade dos pneus",
        icon: <FaWrench />,
        duration: "45-60 minutos",
        benefits: ["Equipamento laser", "Ajuste preciso", "Relatório completo", "Teste de estrada"]
      },
      {
        name: "Revisão Periódica",
        description: "Check-up completo do veículo conforme especificações do fabricante",
        icon: <FaListAlt />,
        duration: "1-2 horas",
        benefits: ["Inspeção 50 pontos", "Relatório detalhado", "Peças originais", "Manutenção preventiva"]
      }
    ]
  },
  {
    id: 2,
    name: "Reparação",
    icon: <FaCar size={16} />,
    subservices: [
      {
        name: "Travões",
        description: "Reparação e substituição completa do sistema de travagem para máxima segurança",
        icon: <FaCarCrash />,
        duration: "1-2 horas",
        benefits: ["Pastilhas novas", "Discos verificados", "Líquido de travões", "Teste de segurança"]
      },
      {
        name: "Suspensão",
        description: "Reparação do sistema de suspensão para melhor conforto e estabilidade na condução",
        icon: <FaCogs />,
        duration: "2-3 horas",
        benefits: ["Amortecedores novos", "Molas verificadas", "Alinhamento incluído", "Condução suave"]
      },
      {
        name: "Motor",
        description: "Diagnóstico e reparação de problemas no motor por especialistas qualificados",
        icon: <FaTools />,
        duration: "3-6 horas",
        benefits: ["Diagnóstico computadorizado", "Peças originais", "Teste de desempenho", "Especialização técnica"]
      },
      {
        name: "Transmissão",
        description: "Reparação do sistema de transmissão para mudanças suaves e eficientes",
        icon: <FaCog />,
        duration: "4-8 horas",
        benefits: ["Óleo de transmissão", "Componentes novos", "Ajuste preciso", "Teste extensivo"]
      }
    ]
  },
  {
    id: 4,
    name: "Diagnóstico",
    icon: <FaClipboardList size={16} />,
    subservices: [
      {
        name: "Diagnóstico Profissional",
        description: "Análise computadorizada completa para identificar todos os problemas do veículo",
        icon: <FaClipboardList />,
        duration: "45-90 minutos",
        benefits: ["Scanner profissional", "Relatório detalhado", "Orçamento gratuito", "Especialistas qualificados"]
      }
    ]
  },
];

// Função para enviar email de orçamento
const handleOrcamentoClick = (serviceName) => {
  const subject = `Pedido de Orçamento - ${serviceName}`;
  const body = `Bom dia,\n\nGostaria de solicitar um orçamento para o serviço de ${serviceName}.\n\nPor favor, contacte-me com os detalhes.\n\nCumprimentos`;
  window.location.href = `mailto:ebtrading24h@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

// Função para obter a imagem de background
const getServiceBackgroundImage = (serviceName) => {
  const serviceImages = {
    'Mudança de Óleo': 'https://images.unsplash.com/photo-1603712618944-1a68b2d13a8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    'Alinhamento': 'https://images.unsplash.com/photo-1621905251181-0fe5e5f5c6f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    'Revisão Periódica': 'https://images.unsplash.com/photo-1565689228866-1d7afc55f3f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    'Travões': 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    'Suspensão': 'https://images.unsplash.com/photo-1603712618944-1a68b2d13a8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    'Motor': 'https://images.unsplash.com/photo-1565689228866-1d7afc55f3f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    'Transmissão': 'https://images.unsplash.com/photo-1621905251181-0fe5e5f5c6f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    'Diagnóstico Profissional': 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'
  };
  
  return serviceImages[serviceName] || 'https://images.unsplash.com/photo-1603712618944-1a68b2d13a8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80';
};

export default function ServicePage() {
  const { serviceName } = useParams();
  const navigate = useNavigate()
  
  // Encontrar o subserviço baseado no nome do parâmetro
  let currentSubservice = null;
  let parentService = null;

  // Procurar em todos os serviços e subserviços
  for (const service of SERVICES) {
    const foundSubservice = service.subservices.find(sub => 
      sub.name === serviceName
    );
    
    if (foundSubservice) {
      currentSubservice = foundSubservice;
      parentService = service;
      break;
    }
  }

  // Se o subserviço não for encontrado
  if (!currentSubservice || !parentService) {
    return (
      <>
        <Header />
        <div className="min-vh-100" style={{ paddingTop: '100px' }}>
          <div className="container text-center py-5">
            <h1 className="text-danger">Subserviço Não Encontrado</h1>
            <p>O subserviço "{serviceName}" não existe.</p>
            <a href="/services" className="btn btn-primary">Ver Todos os Serviços</a>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="py-5 mt-5 position-relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 50%, rgba(51, 65, 85, 0.85) 100%)',
        color: 'white',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center'
      }}>
        {/* Background Image */}
        <div className="position-absolute top-0 start-0 w-100 h-100">
          <div className="w-100 h-100" style={{
            backgroundImage: `url(${getServiceBackgroundImage(currentSubservice.name)})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.15,
            filter: 'brightness(0.3)'
          }} />
          
          <div className="position-absolute top-0 start-0 w-100 h-100"
            style={{
              background: 'linear-gradient(90deg, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.7) 50%, rgba(15, 23, 42, 0.3) 100%)'
            }}
          />
        </div>

        <div className="container position-relative">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/services" className="text-light text-decoration-none">Serviços</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href={`/servico/${parentService.name}`} className="text-light text-decoration-none">
                      {parentService.name}
                    </a>
                  </li>
                  <li className="breadcrumb-item active text-light" aria-current="page">
                    {currentSubservice.name}
                  </li>
                </ol>
              </nav>

              <div className="d-flex align-items-center mb-3">
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'rgba(22, 249, 219, 0.1)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #16f9db'
                }}>
                  {React.cloneElement(currentSubservice.icon, { size: 24, color: '#16f9db' })}
                </div>
                <h1 className="display-4 fw-bold ms-3 mb-0">{currentSubservice.name}</h1>
              </div>
              
              <p className="lead fs-4 text-light">{currentSubservice.description}</p>
              
              <div className="d-flex flex-wrap gap-4 mt-4">
                <div className="d-flex align-items-center">
                  <FaClock className="text-warning me-2" size={20} />
                  <div>
                    <small className="text-light">Duração</small>
                    <div className="fw-bold">{currentSubservice.duration}</div>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <FaStar className="text-success me-2" size={20} />
                  <div>
                    <small className="text-light">Qualidade</small>
                    <div className="fw-bold">Serviço profissional</div>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <FaUsers className="text-info me-2" size={20} />
                  <div>
                    <small className="text-light">Especialistas</small>
                    <div className="fw-bold">Qualificados</div>
                  </div>
                </div>
              </div>

              <div className="d-flex gap-3 mt-4 flex-wrap">
                <button 
                  className="btn btn-outline-light btn-lg px-4 py-2"
                  onClick={() => handleOrcamentoClick(currentSubservice.name)}
                >
                  <FaEnvelope className="me-2" />
                  Pedir Orçamento
                </button>
              </div>
            </div>
            
            <div className="col-lg-4 text-center">
              <div className="card border-0 shadow-lg" style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div className="card-body py-4">
                  <h5 className="text-warning mb-3">📞 Contacte-nos</h5>
                  <p className="text-light mb-3">
                    Solicite um orçamento personalizado para o seu veículo
                  </p>
                  <div className="mb-3">
                    <FaEnvelope className="text-primary me-2" />
                    <small className="text-light">ebtrading24h@gmail.com</small>
                  </div>
                  <button 
                    className="btn btn-outline-light btn-sm w-100 mt-2"
                    onClick={() => handleOrcamentoClick(currentSubservice.name)}
                  >
                    <FaEnvelope className="me-2" />
                    Pedir Orçamento por Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Processo Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="fw-bold text-center mb-5">Como Funciona o Nosso Processo</h2>
          <div className="row">
            <div className="col-md-3 text-center mb-4">
              <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                   style={{width: '60px', height: '60px'}}>
                <span className="fw-bold">1</span>
              </div>
              <h5>Contacto</h5>
              <p className="text-muted">Entre em contacto connosco para marcar</p>
            </div>
            <div className="col-md-3 text-center mb-4">
              <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                   style={{width: '60px', height: '60px'}}>
                <span className="fw-bold">2</span>
              </div>
              <h5>Diagnóstico</h5>
              <p className="text-muted">Análise completa do seu veículo</p>
            </div>
            <div className="col-md-3 text-center mb-4">
              <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                   style={{width: '60px', height: '60px'}}>
                <span className="fw-bold">3</span>
              </div>
              <h5>Execução</h5>
              <p className="text-muted">Serviço executado por especialistas</p>
            </div>
            <div className="col-md-3 text-center mb-4">
              <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                   style={{width: '60px', height: '60px'}}>
                <span className="fw-bold">4</span>
              </div>
              <h5>Entrega</h5>
              <p className="text-muted">Testes finais e entrega do veículo</p>
            </div>
          </div>
        </div>
      </section>

      {/* Outros Subserviços da Mesma Categoria */}
      <section className="py-5  text-white" style={{background:"#10192b"}}>
        <div className="container">
          <h3 className="fw-bold text-center mb-5">Outros Serviços de {parentService.name}</h3>
          <div className="row justify-content-center">
            {parentService.subservices
              .filter(sub => sub.name !== currentSubservice.name)
              .map((subservice, index) => (
              <div key={index} className="col-lg-4 col-md-6 mb-4">
                <div className="card h-100 border-0" style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <div className="card-body text-center p-4">
                    <div className="mb-3">
                      {React.cloneElement(subservice.icon, { 
                        size: 32, 
                        className: 'text-primary' 
                      })}
                    </div>
                    <h5 className="fw-bold text-light">{subservice.name}</h5>
                    <p className="text-light mb-3">{subservice.description}</p>
                    <div className="mb-3">
                      <small className="text-warning">{subservice.duration}</small>
                    </div>
                    <a 
                      href={`/servico/${subservice.name}`}
                      onClick={(e)=>{
                        e.preventDefault()
                        scroll(top)
                        navigate(`/servico/${subservice.name}`)
                      }}
                      className="btn btn-outline-light btn-sm"
                    >
                      Saber Mais
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}