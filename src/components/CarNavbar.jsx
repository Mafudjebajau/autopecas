import React, { useState, useEffect } from "react";
import "./CarBrandsNav.css";

const CAR_BRANDS = [
  {
    id: 1,
    name: "Toyota",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg",
    models: ["Corolla", "Hilux", "Yaris"],
  },
  {
    id: 2,
    name: "BMW",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg",
    models: ["X5", "M3", "i8"],
  },
  {
    id: 3,
    name: "Mercedes",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg",
    models: ["C-Class", "E-Class", "S-Class"],
  },
  {
    id: 4,
    name: "Audi",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Audi_logo_detail.svg",
    models: ["A4", "Q7", "R8"],
  },
];

export default function CarBrandsNav() {
  const [activeBrand, setActiveBrand] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleClick = (id) => {
    if (isMobile) setActiveBrand(activeBrand === id ? null : id);
  };

  return (
    <nav className="brand-navbar container-fluid py-3">
      <ul className="brand-list d-flex justify-content-start flex-nowrap m-0 p-0">
        {CAR_BRANDS.map((brand) => (
          <li
            key={brand.id}
            className="brand-item mx-2"
            onMouseEnter={() => !isMobile && setActiveBrand(brand.id)}
            onMouseLeave={() => !isMobile && setActiveBrand(null)}
            onClick={() => handleClick(brand.id)}
          >
            <div className="brand-link d-flex align-items-center">
              <img src={brand.logo} alt={brand.name} className="brand-logo me-2" />
              <span className="brand-name">{brand.name}</span>
            </div>

            {activeBrand === brand.id && (
              <div
                className={`brand-dropdown shadow-lg ${
                  isMobile ? "mobile" : ""
                }`}
              >
                {!isMobile && <div className="dropdown-arrow"></div>}
                <ul className="list-unstyled mb-0">
                  {brand.models.map((model, index) => (
                    <li key={index} className="dropdown-item">
                      {model}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
