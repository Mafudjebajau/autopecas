import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toyotalogo from "../assets/toyota-logo.png"; // Add missing import

export const BrandsSection = React.memo(() => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState(5);
  const [CAR_BRANDS, setCAR_BRANDS] = useState([]); // Fixed variable name
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    async function carregarDados() {
      try {
        setLoading(true);
        const response = await fetch('http://192.168.1.139:8000/brand/');
        
        if (!response.ok) {
          throw new Error('Erro ao carregar marcas');
        }
        
        const data = await response.json();
        const formattedData = data.map(item => ({
          id: item.id,
          name: item.name,
          logo: item.logo || toyotalogo, // Use the imported toyotalogo
        }));
        // const formattedData = [
        // {
        //   id: 1,
        //   name: "toyota",
        //   logo: "/src/assets/toyota-logo-600.png"
        // },
        //  {
        //   id: 2,
        //   name: "mercedes",
        //   logo: "/src/assets/mercedes-logo-600.png"
        // }
        // ]
        setCAR_BRANDS(formattedData);
        console.log("Marcas carregadas da API:", formattedData);
      } catch (error) {
        console.error("Erro ao carregar marcas:", error);
        // You could set some fallback data here if needed
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, []);

  const totalBrands = CAR_BRANDS.length;

  // Ajustar número de itens visíveis baseado no tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleItems(3);
      } else if (window.innerWidth < 992) {
        setVisibleItems(4);
      } else {
        setVisibleItems(5);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calcular qual índice está no centro
  const getCenterIndex = (index) => {
    return (currentIndex + index) % totalBrands;
  };

  // Determinar se o card está no centro
  const isCardInCenter = (index) => {
    return index === Math.floor(visibleItems / 2);
  };

  const getCardScale = (index) => {
    if (isCardInCenter(index)) return 1.2;

    const distanceFromCenter = Math.abs(index - Math.floor(visibleItems / 2));
    if (distanceFromCenter === 1) return 1.1;
    if (distanceFromCenter === 2) return 1.0;
    return 0.9;
  };

  const getCardOpacity = (index) => {
    if (isCardInCenter(index)) return 1;

    const distanceFromCenter = Math.abs(index - Math.floor(visibleItems / 2));
    if (distanceFromCenter === 1) return 0.8;
    if (distanceFromCenter === 2) return 0.7;
    return 0.6;
  };

  const getCardZIndex = (index) => {
    if (isCardInCenter(index)) return 30;

    const distanceFromCenter = Math.abs(index - Math.floor(visibleItems / 2));
    if (distanceFromCenter === 1) return 20;
    if (distanceFromCenter === 2) return 10;
    return 1;
  };

  // Gerar array de índices visíveis
  const getVisibleIndices = () => {
    const indices = [];
    for (let i = 0; i < visibleItems; i++) {
      indices.push((currentIndex + i) % totalBrands);
    }
    return indices;
  };

  // Funções de navegação manual
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalBrands);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalBrands) % totalBrands);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Show loading state
  if (loading) {
    return (
      <section id="marcas" className="py-1 position-relative overflow-hidden">
        <div className="container-fluid position-relative py-2">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
            <p className="text-white mt-3">Carregando marcas...</p>
          </div>
        </div>
      </section>
    );
  }

  // Don't render carousel if no brands
  if (CAR_BRANDS.length === 0) {
    return (
      <section id="marcas" className="py-1 position-relative overflow-hidden">
        <div className="container-fluid position-relative py-2">
          <div className="text-center py-5">
            <p className="text-white">Nenhuma marca encontrada.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="marcas" className="py-1 position-relative overflow-hidden">
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

      <div className="container-fluid position-relative py-2">
        {/* Header */}
        <div className="text-center mb-2 ">

          <div className="py-3 mx-auto  mt-0">
            <span className="badge bg-primary text-white px-2 py-2 rounded-pill fw-semibold ">
              Marcas
            </span>
          </div>
          <h2 className="fw-bold display-4 mb-3 text-white">
            Marcas de <span style={{
              color: 'dodgerblue'
            }}>Excelência</span>
          </h2>
          <p className="lead text-light mx-auto fs-5" style={{ maxWidth: "500px" }}>
            Pecas exclusivas dos maiores fabricantes mundiais de auto
          </p>
        </div>

        {/* Carrossel de Marcas */}
        <div className="brands-carousel position-relative">
          {/* Botões de navegação */}
          <div className="carousel-controls d-flex justify-content-between align-items-center position-absolute top-50 start-0 end-0">
            <div className="ms-5 transformed">
              <button
                className="btn btn-control-prev  ms-5 "
                onClick={prevSlide}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.5rem',
                  marginLeft: '1rem',
                  transition: 'all 0.3s ease',
                  zIndex: 50
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                ‹
              </button>
            </div>
            <div className="me-5 transformed">
              <button
                className="btn btn-control-next  me-5 "
                onClick={nextSlide}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.5rem',
                  marginRight: '1rem',
                  transition: 'all 0.3s ease',
                  zIndex: 50
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                ›
              </button>
            </div>
          </div>

          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              gap: '1.5rem',
              minHeight: '220px',
              padding: '1rem 0'
            }}
          >
            {getVisibleIndices().map((brandIndex, positionIndex) => {
              const brand = CAR_BRANDS[brandIndex];
              const scale = getCardScale(positionIndex);
              const opacity = getCardOpacity(positionIndex);
              const zIndex = getCardZIndex(positionIndex);
              const isCenter = isCardInCenter(positionIndex);

              return (
                <div
                  key={`${brand.id}-${positionIndex}`} // Use brand.id for better key
                  onClick={() => navigate("/marcas")}
                  className="brand-card-modern text-center p-4 rounded-4 position-relative"
                  style={{
                    background: isCenter
                      ? '#2f3c4e3e'
                      : '#2f3c4e23',
                    backdropFilter: 'blur(10px)',
                    border: isCenter
                      ? '1px solid rgba(10, 81, 95, 0.94)'
                      : '1px solid rgba(255, 255, 255, 0.04)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    width: '180px',
                    height: '180px',
                    flex: '0 0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transform: `scale(${scale})`,
                    opacity: opacity,
                    zIndex: zIndex,
                    boxShadow: isCenter
                      ? '2px 5px 5px #26252f34 '
                      : '2px 5px 5px #26252f ',
                    cursor: 'pointer'
                  }}
                >
                  {/* Container do Logo */}
                  <div
                    className="logo-modern-container mb-3"
                    style={{
                      width: '70px',
                      height: '70px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  </div>

                  {/* Nome da Marca */}
                  <span className="text-white fw-semibold small mt-2">
                    {brand.name}
                  </span>

                  {/* Indicador de destaque no card central */}
                  {isCenter && (
                    <div
                      className="position-absolute top-0 start-50 translate-middle-x"
                      style={{
                        width: '30px',
                        height: '3px',
                        background: 'linear-gradient(135deg, rgba(245, 11, 11, 1) , #16f9dbff 100%)',
                        borderRadius: '2px',
                        marginTop: '-6px'
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Indicadores de Progresso */}
          <div className="slide-indicators text-center mt-4">
            {CAR_BRANDS.map((_, index) => (
              <button
                key={index}
                className={`slide-indicator mx-1 ${currentIndex === index ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  border: 'none',
                  background: currentIndex === index
                    ? 'linear-gradient(135deg, #f50b0bff 0%, #f91616ff 100%)'
                    : 'rgba(255, 255, 255, 0.3)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  transform: currentIndex === index ? 'scale(1.2)' : 'scale(1)'
                }}
              />
            ))}
          </div>
        </div>

        {/* Stats Bar */}
      </div>

      <style jsx>{`
      .transformed{
        transform: translateY(-100%) !important;
        }
        .icon-header {
          width: 80px;
          height: 80px;
        }
        
        .bg-w{
          background: rgba(23, 24, 36, 0.97);
          color: white !important;
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

        .brand-card-modern:hover {
          transform: translateY(-5px) scale(1.05) !important;
          box-shadow: .1px 1px 1px lightblue, -1px -1px lightblue  !important;
          opacity: 1 !important;
          z-index: 40 !important;
        }
          
        .brand-card-modern:hover img {
          transform: scale(1.15);
        }

        @media (max-width: 992px) {
          .brand-card-modern {
            width: 160px !important;
            height: 160px !important;
          }
          
          .btn-control-prev,
          .btn-control-next {
            width: 40px !important;
            height: 40px !important;
            font-size: 1.2rem !important;
          }
        }

        @media (max-width: 768px) {
          .brand-card-modern {
            width: 140px !important;
            height: 140px !important;
          }
          
          .logo-modern-container {
            width: 60px !important;
            height: 60px !important;
          }
          
          .btn-control-prev,
          .btn-control-next {
            width: 35px !important;
            height: 35px !important;
            font-size: 1rem !important;
            margin-left: 0.5rem !important;
            margin-right: 0.5rem !important;
          }
        }

        @media (max-width: 576px) {
          .brand-card-modern {
            width: 120px !important;
            height: 120px !important;
            padding: 1rem !important;
          }
          
          .logo-modern-container {
            width: 50px !important;
            height: 50px !important;
          }
          
          .btn-control-prev,
          .btn-control-next {
            width: 30px !important;
            height: 30px !important;
            font-size: 0.9rem !important;
          }
        }
      `}</style>
    </section>
  );
});