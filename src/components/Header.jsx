import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import {
  FaTimes,
  FaTools,
  FaCar,
  FaCog,
  FaClipboardList,
  FaSearch,
  FaHome,
  FaEnvelope,
  FaPersonBooth,
  FaInfoCircle,
  FaBars,
  FaList
} from "react-icons/fa";
import AnimatedToggler from './AnimatedToggler'

const CAR_BRANDS = [
  { id: 1, name: "Toyota", logo: "https://global.toyota/pages/global_toyota/mobility/toyota-brand/emblem_001.jpg", models: ["Corolla", "Hilux", "Yaris"] },
  { id: 2, name: "BMW", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg", models: ["X5", "M3", "i8"] },
  { id: 3, name: "Mercedes", logo: "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg", models: ["C-Class", "E-Class", "S-Class"] },
];

const SERVICES = [
  {
    id: 1,
    name: "Manutenção",
    icon: <FaTools size={16} />,
    subservices: ["Mudança de Óleo", "Alinhamento", "Revisão Periódica"]
  },
  {
    id: 2,
    name: "Reparação",
    icon: <FaCar size={16} />,
    subservices: ["Travões", "Suspensão", "Motor", "Transmissão"]
  },
  {
    id: 4,
    name: "Diagnóstico",
    icon: <FaClipboardList size={16} />,
    subservices: ["Diagnóstico Profissional"]
  },
];

export const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBrandsDropdownOpen, setIsBrandsDropdownOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [activeBrandMobile, setActiveBrandMobile] = useState(null);
  const [activeServiceMobile, setActiveServiceMobile] = useState(null);
  const [hoverBrandDesktop, setHoverBrandDesktop] = useState(null);
  const [hoverServiceDesktop, setHoverServiceDesktop] = useState(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [brandsSubmenuPosition, setBrandsSubmenuPosition] = useState("right");
  const [servicesSubmenuPosition, setServicesSubmenuPosition] = useState("right");

  const brandsDropdownRef = useRef(null);
  const servicesDropdownRef = useRef(null);
  const brandItemsRef = useRef({});
  const serviceItemsRef = useRef({});
  const menuRef = useRef(null);
  const navbarRef = useRef(null);

  // Paleta de colores harmonizada 
  const colors = {
    primary: {
      gradient: "linear-gradient(90deg, #101b34, #2a3f84)",
      dark: "#101b34",
      medium: "#1a2a5e",
      light: "#2a3f84",
      accent: "#3a54aa",
      default: "#ffffffff"
    },
    dropdown: {
      background: "#0f1629",
      border: "#1a2a5e",
      hover: "#1a2a5e",
      text: "#e2e8ff"
    },
    submenu: {
      background: "#151f3c",
      border: "#2a3f84",
      hover: "#2a3f84",
      text: "#ffffff"
    }
  };

  // Detectar mudanca de tela
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileView(window.innerWidth < 992);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Fechar menu ao clicar fora ou fazer scroll
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Fechar dropdowns de marcas e serviços
      if (brandsDropdownRef.current && !brandsDropdownRef.current.contains(event.target)) {
        setIsBrandsDropdownOpen(false);
        setHoverBrandDesktop(null);
      }
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target)) {
        setIsServicesDropdownOpen(false);
        setHoverServiceDesktop(null);
      }

      // Fechar menu mobile ao clicar fora
      if (isMenuOpen && menuRef.current && !menuRef.current.contains(event.target) && 
          navbarRef.current && !navbarRef.current.contains(event.target)) {
        closeAllMenus();
      }
    };

    const handleScroll = () => {
      if (isMenuOpen && isMobileView) {
        closeAllMenus();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('scroll', handleScroll);
    };
  }, [isMenuOpen, isMobileView]);

  // Prevenir scroll do body quando menu está aberto no mobile
  useEffect(() => {
    if (isMobileView) {
      if (isMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen, isMobileView]);

  // Verificar posicao de submenu para marcas
  const checkBrandSubmenuPosition = (brandId) => {
    if (isMobileView) return "right";

    const brandElement = brandItemsRef.current[brandId];
    if (!brandElement) return "right";

    const rect = brandElement.getBoundingClientRect();
    const spaceOnRight = window.innerWidth - rect.right;
    const submenuWidth = 200;

    return spaceOnRight >= submenuWidth ? "right" : "left";
  };

  // Verificar posicao de submenu para servicos
  const checkServiceSubmenuPosition = (serviceId) => {
    if (isMobileView) return "right";

    const serviceElement = serviceItemsRef.current[serviceId];
    if (!serviceElement) return "right";

    const rect = serviceElement.getBoundingClientRect();
    const spaceOnRight = window.innerWidth - rect.right;
    const submenuWidth = 200;

    return spaceOnRight >= submenuWidth ? "right" : "left";
  };

  const handleBrandClick = (brandId) => {
    if (isMobileView) {
      setActiveBrandMobile(activeBrandMobile === brandId ? null : brandId);
      setActiveServiceMobile(null);
    }
  };

  const handleServiceClick = (serviceId) => {
    if (isMobileView) {
      setActiveServiceMobile(activeServiceMobile === serviceId ? null : serviceId);
      setActiveBrandMobile(null);
    }
  };

  const handleBrandHover = (brandId) => {
    if (!isMobileView) {
      setHoverBrandDesktop(brandId);
      setHoverServiceDesktop(null);
      const position = checkBrandSubmenuPosition(brandId);
      setBrandsSubmenuPosition(position);
    }
  };

  const handleServiceHover = (serviceId) => {
    if (!isMobileView) {
      setHoverServiceDesktop(serviceId);
      setHoverBrandDesktop(null);
      const position = checkServiceSubmenuPosition(serviceId);
      setServicesSubmenuPosition(position);
    }
  };

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setIsBrandsDropdownOpen(false);
    setIsServicesDropdownOpen(false);
    setActiveBrandMobile(null);
    setActiveServiceMobile(null);
    setHoverBrandDesktop(null);
    setHoverServiceDesktop(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    closeAllMenus();
  };

  const handleModelClick = (model) => {
    navigate(`/modelo/${model}`);
    closeAllMenus();
  };

  const handleServiceSubClick = (service) => {
    navigate(`/servico/${service}`);
    closeAllMenus();
  };

  return (
    <header
      ref={navbarRef}
      className="navbar navbar-expand-lg navbar-dark fixed-top shadow"
      style={{ background: colors.primary.gradient }}
    >
      <div className="container-fluid w-100 px-3 px-md-5">
        <a
          className="navbar-brand fw-bold d-flex align-items-center gap-2"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleNavigation("/");
          }}
          style={{ color: colors.dropdown.text }}
        >
          <img
            src={logo}
            alt="Logo principal"
            style={{ maxWidth: "70px" }}
          />
          ebTrading
        </a>

        <AnimatedToggler isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} colors={colors} />

        {/* Overlay para mobile */}
        {isMenuOpen && isMobileView && (
          <div 
            className="menu-overlay"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1040,
              animation: 'fadeIn 0.3s ease-in-out'
            }}
            onClick={closeAllMenus}
          />
        )}

        <div 
          ref={menuRef}
          className={`collapse navbar-collapse navbar-collapse-custom ${isMenuOpen ? "show" : ""}`}
          style={
            isMobileView ? {
              position: 'fixed',
              top: 0,
              left: 0,
              width: '280px',
              height: '100vh',
              background: colors.primary.gradient,
              zIndex: 1050,
              padding: '80px 20px 20px 20px',
              transform: isMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
              transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              overflowY: 'auto',
              boxShadow: '2px 0 10px rgba(0,0,0,0.3)'
            } : {}
          }
        >
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-lg-center gap-lg-3">
            <li className="nav-item">
              <a
                className="nav-link small d-flex align-items-center gap-2"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation("/");
                }}
                style={{ 
                  color: colors.dropdown.text,
                  animation: isMenuOpen && isMobileView ? 'slideInFromLeft 0.4s ease-out 0.1s both' : 'none'
                }}
              >
                <FaHome size={14} />
                Home
              </a>
            </li>

            {/* Dropdown Serviços */}
            <li
              className="nav-item dropdown"
              ref={servicesDropdownRef}
              onMouseEnter={() => !isMobileView && setIsServicesDropdownOpen(true)}
              onMouseLeave={() => !isMobileView && setIsServicesDropdownOpen(false)}
              style={{
                animation: isMenuOpen && isMobileView ? 'slideInFromLeft 0.4s ease-out 0.2s both' : 'none'
              }}
            >
              <a
                className="nav-link dropdown-toggle small d-flex align-items-center gap-2"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (isMobileView) {
                    setIsServicesDropdownOpen(!isServicesDropdownOpen);
                    setActiveServiceMobile(null);
                  }
                }}
                aria-expanded={isServicesDropdownOpen}
                style={{ color: colors.dropdown.text }}
              >
                <FaTools size={14} />
                Serviços de Oficina
              </a>

              <ul
                className={`dropdown-menu ${isServicesDropdownOpen ? "show" : ""}`}
                style={{
                  background: colors.dropdown.background,
                  border: `1px solid ${colors.dropdown.border}`,
                  borderRadius: "8px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.3)"
                }}
              >
                {SERVICES.map((service) => (
                  <li
                    key={service.id}
                    className="dropdown-submenu position-relative"
                    ref={el => serviceItemsRef.current[service.id] = el}
                    onMouseEnter={() => handleServiceHover(service.id)}
                    onMouseLeave={() => !isMobileView && setHoverServiceDesktop(null)}
                  >
                    <a
                      className="dropdown-item d-flex justify-content-between align-items-center"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (isMobileView) {
                          handleServiceClick(service.id);
                        }
                      }}
                      style={{
                        cursor: 'pointer',
                        padding: '0.75rem 1rem',
                        borderBottom: `1px solid ${colors.dropdown.border}`,
                        color: colors.dropdown.text,
                        background: 'transparent',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.background = colors.dropdown.hover}
                      onMouseLeave={(e) => e.target.style.background = 'transparent'}
                    >
                      <div className="d-flex align-items-center gap-2">
                        <span style={{ color: colors.primary.accent }}>
                          {service.icon}
                        </span>
                        {service.name}
                        {isMobileView && (
                          <span className="ms-2" style={{ color: colors.primary.accent }}>
                            {activeServiceMobile === service.id ? '▼' : '►'}
                          </span>
                        )}
                      </div>
                      {!isMobileView && (
                        <span className="ms-2" style={{ color: colors.primary.accent }}>
                          ►
                        </span>
                      )}
                    </a>

                    {/* Submenu de subserviços - VERSAO DESKTOP */}
                    {!isMobileView && hoverServiceDesktop === service.id && (
                      <ul
                        className="dropdown-menu show position-absolute"
                        style={{
                          background: colors.submenu.background,
                          left: servicesSubmenuPosition === "right" ? "100%" : "auto",
                          right: servicesSubmenuPosition === "left" ? "100%" : "auto",
                          top: 0,
                          minWidth: "200px",
                          border: `1px solid ${colors.submenu.border}`,
                          borderRadius: "8px",
                          boxShadow: "0 8px 24px rgba(0,0,0,0.3)"
                        }}
                      >
                        {service.subservices.map((subservice, idx) => (
                          <li key={idx}>
                            <a
                              className="dropdown-item"
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleServiceSubClick(subservice);
                              }}
                              style={{
                                padding: '0.75rem 1rem',
                                borderBottom: `1px solid ${colors.submenu.border}`,
                                color: colors.submenu.text,
                                whiteSpace: 'nowrap',
                                background: 'transparent',
                                transition: 'all 0.2s ease',
                                cursor: 'pointer'
                              }}
                              onMouseEnter={(e) => e.target.style.background = colors.submenu.hover}
                              onMouseLeave={(e) => e.target.style.background = 'transparent'}
                            >
                              {subservice}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Submenu de subserviços - VERSAO MOBILE */}
                    {isMobileView && activeServiceMobile === service.id && (
                      <ul
                        className="dropdown-menu show position-relative"
                        style={{
                          background: colors.submenu.background,
                          margin: "5px 0 5px 15px",
                          border: `1px solid ${colors.submenu.border}`,
                          borderRadius: "6px",
                          boxShadow: "inset 0 2px 8px rgba(0,0,0,0.2)",
                          animation: 'slideInFromLeft 0.3s ease-out'
                        }}
                      >
                        {service.subservices.map((subservice, idx) => (
                          <li key={idx}>
                            <a
                              className="dropdown-item"
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleServiceSubClick(subservice);
                                closeAllMenus();
                              }}
                              style={{
                                padding: '0.75rem 1rem',
                                borderBottom: `1px solid ${colors.submenu.border}`,
                                color: colors.submenu.text,
                                background: 'transparent',
                                cursor: 'pointer'
                              }}
                            >
                              {subservice}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </li>

            {/* Dropdown Marcas */}
            <li
              className="nav-item dropdown"
              ref={brandsDropdownRef}
              onMouseEnter={() => !isMobileView && setIsBrandsDropdownOpen(true)}
              onMouseLeave={() => !isMobileView && setIsBrandsDropdownOpen(false)}
              style={{
                animation: isMenuOpen && isMobileView ? 'slideInFromLeft 0.4s ease-out 0.3s both' : 'none'
              }}
            >
              <a
                className="nav-link dropdown-toggle small d-flex align-items-center gap-2"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (isMobileView) {
                    setIsBrandsDropdownOpen(!isBrandsDropdownOpen);
                    setActiveBrandMobile(null);
                  }
                }}
                aria-expanded={isBrandsDropdownOpen}
                style={{ color: colors.dropdown.text }}
              >
                <FaCar size={14} />
                Marcas
              </a>

              <ul
                className={`dropdown-menu ${isBrandsDropdownOpen ? "show" : ""}`}
                style={{
                  background: colors.dropdown.background,
                  border: `1px solid ${colors.dropdown.border}`,
                  borderRadius: "8px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.3)"
                }}
              >
                {CAR_BRANDS.map((brand) => (
                  <li
                    key={brand.id}
                    className="dropdown-submenu position-relative"
                    ref={el => brandItemsRef.current[brand.id] = el}
                    onMouseEnter={() => handleBrandHover(brand.id)}
                    onMouseLeave={() => !isMobileView && setHoverBrandDesktop(null)}
                  >
                    <a
                      className="dropdown-item d-flex justify-content-between align-items-center"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (isMobileView) {
                          handleBrandClick(brand.id);
                        }
                      }}
                      style={{
                        cursor: 'pointer',
                        padding: '0.75rem 1rem',
                        borderBottom: `1px solid ${colors.dropdown.border}`,
                        color: colors.dropdown.text,
                        background: 'transparent',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.background = colors.dropdown.hover}
                      onMouseLeave={(e) => e.target.style.background = 'transparent'}
                    >
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src={brand.logo}
                          alt={`Logo ${brand.name}`}
                          style={{
                            width: 20,
                            height: 20,
                            objectFit: "contain",
                          }}
                        />
                        {brand.name}
                        {isMobileView && (
                          <span className="ms-2" style={{ color: colors.primary.accent }}>
                            {activeBrandMobile === brand.id ? '▼' : '►'}
                          </span>
                        )}
                      </div>
                      {!isMobileView && (
                        <span className="ms-2" style={{ color: colors.primary.accent }}>
                          ►
                        </span>
                      )}
                    </a>

                    {/* Submenu de modelos - VERSAO DESKTOP */}
                    {!isMobileView && hoverBrandDesktop === brand.id && (
                      <ul
                        className="dropdown-menu show position-absolute"
                        style={{
                          background: colors.submenu.background,
                          left: brandsSubmenuPosition === "right" ? "100%" : "auto",
                          right: brandsSubmenuPosition === "left" ? "100%" : "auto",
                          top: 0,
                          minWidth: "200px",
                          border: `1px solid ${colors.submenu.border}`,
                          borderRadius: "8px",
                          boxShadow: "0 8px 24px rgba(0,0,0,0.3)"
                        }}
                      >
                        {brand.models.map((model, idx) => (
                          <li key={idx}>
                            <a
                              className="dropdown-item"
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleModelClick(model);
                              }}
                              style={{
                                padding: '0.75rem 1rem',
                                borderBottom: `1px solid ${colors.submenu.border}`,
                                color: colors.submenu.text,
                                whiteSpace: 'nowrap',
                                background: 'transparent',
                                transition: 'all 0.2s ease',
                                cursor: 'pointer'
                              }}
                              onMouseEnter={(e) => e.target.style.background = colors.submenu.hover}
                              onMouseLeave={(e) => e.target.style.background = 'transparent'}
                            >
                              {model}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Submenu de modelos - VERSAO MOBILE */}
                    {isMobileView && activeBrandMobile === brand.id && (
                      <ul
                        className="dropdown-menu show position-relative"
                        style={{
                          background: colors.submenu.background,
                          margin: "5px 0 5px 15px",
                          border: `1px solid ${colors.submenu.border}`,
                          borderRadius: "6px",
                          boxShadow: "inset 0 2px 8px rgba(0,0,0,0.2)",
                          animation: 'slideInFromLeft 0.3s ease-out'
                        }}
                      >
                        {brand.models.map((model, idx) => (
                          <li key={idx}>
                            <a
                              className="dropdown-item"
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleModelClick(model);
                                closeAllMenus();
                              }}
                              style={{
                                padding: '0.75rem 1rem',
                                borderBottom: `1px solid ${colors.submenu.border}`,
                                color: colors.submenu.text,
                                background: 'transparent',
                                cursor: 'pointer'
                              }}
                            >
                              {model}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </li>

            <li 
              className="nav-item"
              style={{
                animation: isMenuOpen && isMobileView ? 'slideInFromLeft 0.4s ease-out 0.4s both' : 'none'
              }}
            >
              <a
                className="nav-link small d-flex align-items-center gap-2"
                href="#sobre"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation("/sobre");
                }}
                style={{ color: colors.dropdown.text }}
              >
                <FaInfoCircle size={14} />
                Sobre
              </a>
            </li>

            <li 
              className="nav-item"
              style={{
                animation: isMenuOpen && isMobileView ? 'slideInFromLeft 0.4s ease-out 0.5s both' : 'none'
              }}
            >
             
            </li>
          </ul>
        </div>

        {/*  estilos CSS para as animações */}
        <style>
          {`
            @keyframes slideInFromLeft {
              0% {
                transform: translateX(-20px);
                opacity: 0;
              }
              100% {
                transform: translateX(0);
                opacity: 1;
              }
            }

            @keyframes fadeIn {
              0% {
                opacity: 0;
              }
              100% {
                opacity: 1;
              }
            }

            .navbar-collapse-custom {
              transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }

            @media (max-width: 991.98px) {
              .navbar-collapse-custom {
                position: fixed;
                top: 0;
                left: 0;
                width: 280px;
                height: 100vh;
                background: ${colors.primary.gradient};
                z-index: 1050;
                padding: 80px 20px 20px 20px;
                transform: translateX(-100%);
                overflow-y: auto;
                box-shadow: 2px 0 10px rgba(0,0,0,0.3);
              }
              
              .navbar-collapse-custom.show {
                transform: translateX(0);
              }
            }
          `}
        </style>
      </div>
    </header>
  );
};