import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import boshlogo from "../assets/bosh-logo.webp";
import philipslogo from "../assets/philips-logo.webp";
import logo_3m from "../assets/3m-logo.webp";
import bardahllogo from "../assets/bardahl-logo.webp";
import toyotalogo from "../assets/toyota-logo.png"


const CAR_BRANDS = [
  { id: 1, name: "Toyota", logo: toyotalogo },
  { id: 2, name: "BMW", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg" },
  { id: 3, name: "Mercedes", logo: "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg" },
  { id: 4, name: "Bosch", logo: boshlogo },
  { id: 5, name: "Philips", logo: philipslogo },
  { id: 6, name: "3M", logo: logo_3m },
  { id: 7, name: "Bardahl", logo: bardahllogo },
];

export const BrandsSection = React.memo(() => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState(5);

  const scrollInterval = 3000; // tempo entre movimentos
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

  // rolagem automática
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalBrands);
    }, scrollInterval);

    return () => clearInterval(interval);
  }, [totalBrands]);

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

  return (
    <section id="marcas" className="py-6 position-relative overflow-hidden">
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

      <div className="container-fluid position-relative py-4">
        {/* Header */}
        <div className="text-center mb-6 ">

          <div className="icon-header mx-auto  mt-2">
            <span className="badge bg-primary text-white px-4 py-2 rounded-pill fw-semibold mb-3">
              Marcas
            </span>
          </div>
          <h2 className="fw-bold display-4 mb-3 text-white">
            Marcas <span style={{
              color: 'dodgerblue'
            }}>Premium</span>
          </h2>
          <p className="lead text-light mx-auto fs-5" style={{ maxWidth: "500px" }}>
            Pecas exclusivas dos maiores fabricantes mundiais de auto
          </p>
        </div>

        {/* Carrossel de Marcas */}
        <div className="brands-carousel position-relative">
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
                  key={`${brandIndex}-${positionIndex}`}
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
                      : '2px 5px 5px #26252f '
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
                onClick={() => setCurrentIndex(index)}
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  border: 'none',
                  background: currentIndex === index
                    ? 'linear-gradient(135deg, #f50b0bff 0%, #f91616ff 100%)'
                    : 'rgba(255, 255, 255, 0.3)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
              />
            ))}
          </div>
        </div>

        {/* Stats Bar */}



      </div>

      <style jsx>{`
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
          }import { Link } from 'react-router-dom';

        }
      `}</style>
    </section>
  );
});