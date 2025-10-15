import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaChevronDown } from "react-icons/fa";

const CAR_BRANDS = [
  { id: 1, name: "Toyota", logo: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg", models: ["Corolla", "Yaris", "Hilux"] },
  { id: 2, name: "Ford", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Ford_logo_flat.svg", models: ["Focus", "Fiesta", "Ranger"] },
  { id: 3, name: "BMW", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg", models: ["X5", "M3", "320i"] },
  { id: 4, name: "Mercedes", logo: "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg", models: ["C200", "A180", "GLA"] },
];

export default function CarBrandsSection() {
  const [openBrand, setOpenBrand] = useState(null);

  const toggleDropdown = (id) => {
    setOpenBrand(openBrand === id ? null : id);
  };

  return (
    <section id="brand" className="px-3 px-md-5 py-5" aria-labelledby="marcas-carros-title" style={{ background: "#0d0d0d" }}>
      <h3 id="marcas-carros-title" className="h5 text-light mb-4 text-uppercase fw-bold">Marcas de Carros</h3>
      <div className="row g-3">
        {CAR_BRANDS.map((brand) => (
          <div key={brand.id} className="col-6 col-md-3">
            <div
              className="card bg-dark border-0 shadow-sm text-center position-relative"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              style={{
                cursor: "pointer",
                borderRadius: "1.2rem",
                backdropFilter: "blur(8px)",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                overflow: "hidden",
              }}
              onClick={() => toggleDropdown(brand.id)}
            >
              <div className="card-body py-4">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="img-fluid mb-2"
                  style={{ height: 50, objectFit: "contain" }}
                />
                <h6 className="text-light mb-1">{brand.name}</h6>
                <div
                  animate={{ rotate: openBrand === brand.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-secondary"
                >
                  <FaChevronDown />
                </div>
              </div>

              <div>
                {openBrand === brand.id && (
                  <div
                    key="dropdown"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="bg-dark text-light text-start px-3 py-2"
                    style={{
                      borderTop: "1px solid rgba(255,255,255,0.1)",
                      borderBottomLeftRadius: "1.2rem",
                      borderBottomRightRadius: "1.2rem",
                    }}
                  >
                    {brand.models.map((model, index) => (
                      <div
                        key={index}
                        className="py-2 small border-bottom border-secondary-subtle d-flex align-items-center justify-content-between"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          alert(`Selecionou ${brand.name} ${model}`);
                        }}
                      >
                        <span>{model}</span>
                        <span className="text-muted">→</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
