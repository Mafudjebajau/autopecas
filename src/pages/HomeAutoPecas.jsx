import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import heroCar from "../assets/hero-car.png";


// Marcas de carros
const CAR_BRANDS = [
  { id: 1, name: "Toyota", logo: "https://global.toyota/pages/global_toyota/mobility/toyota-brand/emblem_001.jpg", color: "#ef4444" },
  { id: 2, name: "Ford", logo: "https://www.diariomotor.com/imagenes/2020/12/logotipo-ford-paul-rand-p.jpg?class=XL", color: "#3b82f6" },
  { id: 3, name: "BMW", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/2048px-BMW.svg.png", color: "#6366f1" },
  { id: 4, name: "Mercedes", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/2048px-Mercedes-Logo.svg.png", color: "#8b5cf6" },
];

// Peças simulando dados do backend
const CAR_PARTS = [
  { id: 1, brand: "Toyota", name: "Filtro de Óleo Bosch", price: 19.9 },
  { id: 2, brand: "Toyota", name: "Pastilha de Freio Cobreq", price: 49.0 },
  { id: 3, brand: "Ford", name: "Bateria Moura 60Ah", price: 399.0 },
  { id: 4, brand: "Ford", name: "Vela NGK", price: 12.5 },
  { id: 5, brand: "BMW", name: "Amortecedor Monroe", price: 219.9 },
  { id: 6, brand: "Mercedes", name: "Óleo 5W-30 1L", price: 39.9 },
  { id: 7, brand: "BMW", name: "Pastilha de Freio Brembo", price: 79.9 },
];

function Header({ onSearch }) {
  return (
    <header className="bg-dark text-white">
      <div className=" d-flex justify-content-between align-items-center py-3 px-5 flex-wrap">
        <h1 className="h5 mb-0">logo</h1>
        <div className=" px-3 my-2 my-md-0 " >
          <div className="position-relative " >
            <div style={{ maxWidth: '400px' }} className="d-flex gap-2">
              <input
                type="search"
                placeholder="Procure por peça ou marca..."
                onChange={(e) => onSearch(e.target.value)}
                className="form-control"
              />
              <button className="btn btn-outline-danger" onClick={(e)=>onSearch(e.target.value)}>pesquisar</button>
            </div>
          </div>
        </div>
        <nav className="d-flex gap-3">
          <a className="text-white" href="#">Home</a>
          <a className="text-white" href="#">Marcas</a>
          <a className="text-white" href="#">Contato</a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
      //  <section style={{ background: 'linear-gradient(90deg, #1e293b, #334155, #1e293b)', color: 'white' }}></section>
    <section style={{ background: 'linear-gradient(90deg, #1d3253ff, #1d3557ff, #3a5f9bff)', color: 'white' }}>
      <div className=" d-flex justify-content-center flex-column flex-md-row align-items-center py-5 gap-4">
        <div className="md-7 ps-5 text-center text-md-start">
          <h2 className="display-5 fw-bold">Peças que movem sua jornada.</h2>
          <p className="text-secondary mt-3" style={{fontSize:"1.5rem"}}>Do filtro ao conjunto de suspensão. Original, recondicionado ou aftermarket — a escolha é sua, a qualidade é nossa.</p>
          <div className="mt-5 d-flex gap-2">
            <button className="btn btn-danger fw-semibold">Marcas</button>
            <button className="btn btn-outline-light">Fale conosco</button>
          </div>
        </div>
        <div className="md-5">
          <img src={heroCar} alt="hero" className="rounded mx-auto d-block" />
        </div>
      </div>
    </section>
  );
}

function BrandCard({ brand, onClick }) {
  return (
    <div
      className="card h-100 text-center shadow-sm p-3"
      style={{ borderRadius: '0.75rem', cursor: 'pointer', transition: 'all 0.3s' }}
      onClick={() => onClick(brand.name)}
    >
      <img src={brand.logo} alt={brand.name} className="mx-auto mb-3" style={{ maxHeight: '80px', objectFit: 'contain', transition: 'transform 0.3s' }} />
      <h5 style={{ color: brand.color, fontWeight: 600 }}>{brand.name}</h5>
    </div>
  );
}

function PartCard({ part }) {
  return (
    <div className="card shadow-sm h-100 p-3">
      <h5>{part.name}</h5>
      <p className="text-secondary">{part.brand}</p>
      <div className="fw-bold">R$ {part.price.toFixed(2)}</div>
    </div>
  );
}

export default function HomeAutoPecas() {
  const [query, setQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState(null);

  const filteredParts = CAR_PARTS.filter(p => {
    const matchesBrand = !selectedBrand || p.brand === selectedBrand;
    const matchesQuery = query.trim() === '' || `${p.name} ${p.brand}`.toLowerCase().includes(query.toLowerCase());
    return matchesBrand && matchesQuery;
  });

  return (
    <div className="bg-light text-dark min-vh-100">
      <Header onSearch={setQuery} />
      <main>
        <Hero />

        <section className="container py-5">
          <h3 className="h4 mb-4 text-center">Marcas de Carros</h3>
          <div className="row g-4">
            {CAR_BRANDS.map(brand => (
              <div key={brand.id} className="col-6 col-md-3">
                <BrandCard brand={brand} onClick={setSelectedBrand} />
              </div>
            ))}
          </div>
        </section>

        {selectedBrand && (
          <section className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="h4">Peças da {selectedBrand}</h3>
              <button className="btn btn-outline-secondary btn-sm" onClick={() => setSelectedBrand(null)}>Ver todas as marcas</button>
            </div>
            <div className="row g-4">
              {filteredParts.length > 0 ? filteredParts.map(part => (
                <div key={part.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <PartCard part={part} />
                </div>
              )) : <p className="text-center">Nenhuma peça encontrada.</p>}
            </div>
          </section>
        )}
      </main>

      <footer className="bg-dark text-light mt-5">
        <div className="container py-5 px-5 row row-cols-1 row-cols-md-3 g-4">
          <div>
            <h5 className="text-white">AutoPeças Express</h5>
            <p className="small">A loja que entende seu carro. Atendimento humano, estoque real.</p>
          </div>
          <div>
            <h6 className="fw-bold">Links úteis</h6>
            <ul className="list-unstyled small mt-2">
              <li>Política de Troca</li>
              <li>FAQs</li>
              <li>Trabalhe Conosco</li>
            </ul>
          </div>
          <div>
            <h6 className="fw-bold">Contato</h6>
            <p className="small mb-0">email@autopecas.ex | +55 11 4000-0000</p>
          </div>
        </div>
        <div className="text-center small text-secondary py-3">© {new Date().getFullYear()} AutoPeças Express — Todos os direitos reservados</div>
      </footer>

      <style jsx>{`
        .card:hover img {
          transform: scale(1.1) rotate(-3deg);
        }
        .card:hover {
          transform: translateY(-10px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.25);
        }
      `}</style>
    </div>
  );
}
