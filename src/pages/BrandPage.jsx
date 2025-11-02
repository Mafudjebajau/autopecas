import { Header } from "../components/Header";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaSearch, FaCar, FaAward, FaHeadset, FaArrowRight } from "react-icons/fa";
import { Footer } from "../components/Footer";
import Loader from "../components/Loading_Component";

// Dados das marcas exatamente no padrão fornecido
// const CAR_BRANDS = [
//   {
//     "id": 1,
//     "name": "Toyota",
//     "logo": "https://global.toyota/pages/global_toyota/mobility/toyota-brand/emblem_001.jpg",
//     "models": ["Corolla", "Hilux", "Yaris"],
//     "founded":1980,
//     "country": "Japan"
//   },
//   {
//     "id": 2,
//     "name": "BMW",
//     "logo": "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg",
//     "models": ["X5", "M3", "i8"],
//     "founded":1980,
//     "country": "Germany"
//   },
//   {
//     "id": 3,
//     "name": "Mercedes",
//     "logo": "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg",
//     "models": ["C-Class", "E-Class", "S-Class"],
//     "founded":1980,
//     "country": "Germany"
//   },
// ];



export default function BrandsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);
  const [CAR_BRANDS, setCAR_BRANDS] = useState([]); // Fixed variable name
  const [filteredBrands, setFilteredBrands] = useState(CAR_BRANDS);

  useEffect(() => {
    async function carregarDados() {
      try {
        setLoading(true);
        const response = await fetch('http://192.168.1.139:8000/brand/');

        if (!response.ok) {
          throw new Error('Erro ao carregar marcas');
        }

        const data = await response.json();
        console.log(data)
        setCAR_BRANDS(data);
      } catch (error) {
        console.error("Erro ao carregar marcas:", error);
        // You could set some fallback data here if needed
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
    console.log(CAR_BRANDS);
  }, []);

  useEffect(() => {
    
    // Simular carregamento
    setTimeout(() => {
      setLoading(false);
    }, 800);

    // Detectar mudanca de tela
    const checkScreenSize = () => {
      setIsMobileView(window.innerWidth < 992);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const filtered = CAR_BRANDS.filter(brand =>
      brand.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBrands(filtered);
  }, [searchTerm]);

  if (loading) {
    return (
      <Loader />
    );
  }

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className=" text-white py-5" style={{
        background: "linear-gradient(45deg, #10192b, #1d3557ff, #3a5f9bff)",
      }}>
        <div className="container pt-5">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <div className="icon-header mb-4">
                <div className="icon-wrapper">
                  <FaAward className="text-warning" size={32} />
                </div>
              </div>
              <h1 className="display-4 fw-bold mb-3">
                <span className="text-primary">Marcas</span> Disponíveis
              </h1>
              <p className="lead mb-4 fs-5">
                Explore e encontre peças de veículo perfeito para ti.
              </p>
              {!isMobileView &&
                <div className="row text-center">
                  <div className="col-4">
                    <div className="text-info fw-bold fs-3">{CAR_BRANDS.length}</div>
                    <div className="text-light small">Marcas</div>
                  </div>
                  <div className="col-4">
                    <div className="text-info fw-bold fs-3">
                      {CAR_BRANDS.reduce((total, brand) => total + brand.models.length, 0)}
                    </div>
                    <div className="text-light small">Modelos Disponíveis</div>
                  </div>
                  <div className="col-4">
                    <div className="text-info fw-bold fs-3">100%</div>
                    <div className="text-light small">Originais</div>
                  </div>
                </div>
              }

            </div>
            <div className="col-lg-4 text-center">
              <div className="position-relative">
                <div
                  className="rounded-circle mx-auto"
                  style={{
                    width: '250px',
                    height: '250px',
                    background: 'linear-gradient(135deg, rgba(11, 245, 245, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
                    border: '2px solid rgba(255, 255, 255, 0)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <FaCar size={24} className="text-primary" />
                  <FaCar size={64} className="text-info" />
                  <FaCar size={24} className="text-primary" />
                </div>
              </div>
            </div>
            {isMobileView &&
              <div className="row text-center pt-4">
                <div className="col-4">
                  <div className="text-info fw-bold fs-3">{CAR_BRANDS.length}</div>
                  <div className="text-light small">Marcas</div>
                </div>
                <div className="col-4">
                  <div className="text-info fw-bold fs-3">
                    {CAR_BRANDS.reduce((total, brand) => total + brand.models.length, 0)}
                  </div>
                  <div className="text-light small">Modelos Disponíveis</div>
                </div>
                <div className="col-4">
                  <div className="text-info fw-bold fs-3">100%</div>
                  <div className="text-light small">Originais</div>
                </div>
              </div>
            }

          </div>
        </div>
      </section>

      {/* Busca e Filtros */}
      <section className="container-fluid  h-100 position-relative py-4">

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
        <div className="container ">
          <div className="row justify-content-center">

            {isMobileView &&
              <div className="col-12 position-relative text-light pt-0">
                <h2 className="h3 mb-2 py-3">
                  Todas as Marcas
                </h2>
                <p className="text-secondary">
                  {filteredBrands.length} marca{filteredBrands.length !== 1 ? 's' : ''} encontrada{filteredBrands.length !== 1 ? 's' : ''}
                </p>
              </div>
            }

            <div className="col-lg-8">
              <div className="input-group input-group-lg">
                <span className="input-group-text bg-light border-end-0">
                  <FaSearch className="text-secondary" />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Buscar marca..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ fontSize: '1.1rem' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Marcas */}

        <div className="container-fluid position-relative pb-5 text-light">
          <div className="row mb-4">
            {!isMobileView && <div className="col-12 ">
              <h2 className="h3 mb-2 py-3">
                Todas as Marcas
              </h2>
              <p className="text-secondary">
                {filteredBrands.length} marca{filteredBrands.length !== 1 ? 's' : ''} encontrada{filteredBrands.length !== 1 ? 's' : ''}
              </p>
            </div>}
          </div>

          {CAR_BRANDS.length === 0 ? (
            <div className="text-center py-5">
              <FaCar size={64} className="text-secondary mb-3" />
              <h3>Nenhuma marca encontrada</h3>
              <p className="text-secondary mb-4">
                Não encontramos marcas correspondentes à sua busca.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => setSearchTerm("")}
              >
                Limpar Busca
              </button>
            </div>
          ) : (
            <div className="row g-4">
              {CAR_BRANDS.map(brand => (
                <div key={brand.id} className="col-xl-4 col-lg-6 col-md-6">
                  <Link
                    to={`/marcas/${brand.name.toLowerCase()}`}
                    className="text-decoration-none"
                  >
                    <div className="card h-100  brand-card" style={{
                      background: '#2f3c4e3e',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '2px 5px 5px #26252f '
                    }}>
                      <div className="card-body p-4">
                        <div className="row align-items-center">
                          <div className="col-4">
                            <div className="brand-logo-container">
                              <img
                                src={brand.logo}
                                alt={`Logo ${brand.name}`}
                                className="img-fluid rounded-3"
                                style={{
                                  width: '80px',
                                  height: '80px',
                                  objectFit: 'contain',
                                  padding: '8px',
                                  background: 'white',
                                  border: '1px solid #dee2e6'
                                }}
                                onError={(e) => {
                                  e.target.src = 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=150&h=150&fit=crop';
                                  e.target.style.padding = '0';
                                  e.target.style.background = 'transparent';
                                  e.target.style.border = 'none';
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-8">
                            <h5 className="card-title text-light mb-2">{brand.name}</h5>
                            <p className="text-secondary small mb-3">
                              {brand.models.length} modelo{brand.models.length !== 1 ? 's' : ''} disponível{brand.models.length !== 1 ? 's' : ''}
                            </p>
                            <div className="d-flex align-items-center text-primary">
                              <span className="small fw-semibold">Ver modelos</span>
                              <FaArrowRight size={12} className="ms-2" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Preview dos modelos */}
                      <div className="card-footer bg-transparent border-top-0 pt-0">
                        <div className="model-preview">
                          {brand.models.slice(0, 3).map((model, index) => (
                            <span
                              key={index}
                              className="badge bg-light text-dark me-2 mb-2"
                              style={{ fontSize: '0.75rem' }}
                            >
                              {model}
                            </span>
                          ))}
                          {brand.models.length > 3 && (
                            <span
                              className="badge bg-light text-secondary"
                              style={{ fontSize: '0.75rem' }}
                            >
                              +{brand.models.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />


      <style jsx>{`
        .icon-header {
          width: 80px;
          height: 80px;
        }

        .icon-wrapper {
          width: 100%;
          height: 100%;
          background: rgba(245, 158, 11, 0.1);
          border: 2px solid rgba(245, 158, 11, 0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .brand-card {
          transition: all 0.3s ease;
          background: white;
        }

        .brand-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15) !important;
        }

        .brand-logo-container {
          transition: transform 0.3s ease;
        }

        .brand-card:hover .brand-logo-container {
          transform: scale(1.1);
        }

        .model-preview {
          min-height: 32px;
        }

        @media (max-width: 768px) {
          .brand-card {
            margin-bottom: 1rem;
          }
          
          .display-4 {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </>
  );
}