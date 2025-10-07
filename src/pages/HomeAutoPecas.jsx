import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import heroCar from "../assets/modelo2.png";
import logo from "../assets/logo.svg";
import noimg from "../assets/noimg.png";
import boshlogo from "../assets/bosh-logo.png";
import philipslogo from "../assets/philips-logo.png";
import logo_3m from "../assets/3m-logo.png";
import bardahllogo from "../assets/bardahl-logo.png";
import { FaShoppingCart, FaTimes, FaTrash } from "react-icons/fa";

// Marcas de carros
const CAR_BRANDS = [
  { id: 1, name: "Toyota", logo: "https://global.toyota/pages/global_toyota/mobility/toyota-brand/emblem_001.jpg" },
  { id: 2, name: "Ford", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Ford_logo_flat.svg" },
  { id: 3, name: "BMW", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg" },
  { id: 4, name: "Mercedes", logo: "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg" },
];

// Marcas de artigos
const ARTICLE_BRANDS = [
  { id: 1, name: "Bosch", logo: boshlogo },
  { id: 2, name: "3M", logo: logo_3m },
  { id: 3, name: "Philips", logo: philipslogo },
  { id: 4, name: "Bardahl", logo: bardahllogo },
];

// Peças e artigos
const CAR_PARTS = [
  { id: 1, brand: "Toyota", image: noimg, name: "Filtro de Óleo Bosch", disponivel: true },
  { id: 2, brand: "Toyota", image: noimg, name: "Pastilha de Freio Cobreq", disponivel: true },
  { id: 3, brand: "Ford", image: noimg, name: "Bateria Moura 60Ah", disponivel: false },
  { id: 4, brand: "BMW", image: noimg, name: "Vela NGK", disponivel: true },
  { id: 5, brand: "Mercedes", image: noimg, name: "Amortecedor Monroe", disponivel: false },
  { id: 6, brand: "Bosch", image: noimg, name: "Extintor de Incêndio 1kg", disponivel: true },
  { id: 7, brand: "Philips", image: noimg, name: "Lâmpada Automotiva H7", disponivel: true },
  { id: 8, brand: "3M", image: noimg, name: "Fita Isolante Automotiva", disponivel: false },
  { id: 9, brand: "Bardahl", image: noimg, name: "Aditivo para Radiador", disponivel: true },
  { id: 10, brand: "Bosch", image: noimg, name: "Macaco Hidráulico", disponivel: true },
  { id: 11, brand: "Philips", image: noimg, name: "Lanterna de Emergência", disponivel: true },
  { id: 12, brand: "Bosch", image: noimg, name: "Triângulo de Sinalização", disponivel: true },
];

function normalizeText(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function Header({ onSearch, carrinho, setShowCart }) {
  const [toglebutton, setToglebutton] = useState(false);
  return (
    <header
      className="navbar navbar-expand-lg navbar-dark fixed-top shadow"
      style={{
        background: "linear-gradient(90deg, #101b34ff, #111c44ff, #2a3f84ff)",
        overflow: "hidden",
      }}
    >
      <div className="container-fluid w-100 px-3 px-md-5">
        <a className="navbar-brand fw-bold" href="#">
          <img src={logo} alt="main logo" style={{ maxWidth: "70px" }} /> Trading
        </a>
        {!toglebutton ? <button
          className="navbar-toggler"
          style={{ border: "none !important", boxShadow: "none" }}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          onClick={() => setToglebutton(true)}
        >
          <span className="navbar-toggler-icon"></span>
        </button> : <FaTimes color="red" size={"2.5rem"} onClick={() => setToglebutton(false)}
          type="button"
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
        ></FaTimes>}


        <div className="collapse navbar-collapse" id="mainNavbar">
          <form
            className="d-flex mt-3 mt-lg-0 ms-lg-3"
            style={{ maxWidth: 300, flex: 1 }}
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="search"
              placeholder="Buscar peça ou marca..."
              className="form-control form-control-sm rounded"
              onChange={(e) => onSearch(e.target.value)}
              style={{ border: "none", padding: "0.5rem 1rem" }}
            />
          </form>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-lg-center gap-lg-3">
            <li className="nav-item">
              <a className="nav-link text-white small" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white small" href="#brand">
                Marcas
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white small" href="#contact">
                Contato
              </a>
            </li>
            <li className="nav-item position-relative">

            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section
      className="pt-5 hero"
      style={{
        background: "linear-gradient(90deg, #1d3253ff, #1d3557ff, #3a5f9bff)",
        color: "white",
      }}
    >
      <div className="container-fluid px-3 px-md-5">
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between py-5 gap-4">
          <div className="text-center text-md-start">
            <h2 className="fw-bold display-1">
              A sua loja de peças autênticas e originais.
            </h2>
            <p className="text-ligh mt-3 fs-2 fs-md-5">
              Do filtro ao conjunto de suspensão, só peças originais.
              <br />
              — Escolha E-trading, escolha a originalidade!
            </p>
            <div className="mt-4 d-flex flex-column flex-sm-row justify-content-center justify-content-md-start gap-2">
              <a href="#brand" className="btn btn-danger fw-semibold">
                Marcas
              </a>
              <a href="#contact" className="btn btn-outline-light">
                Fale conosco
              </a>
            </div>
          </div>
          <div>
            <img
              src={heroCar}
              alt="hero"
              className="img-fluid rounded mx-auto d-block hero-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function BrandCard({ brand, onClick }) {
  return (
    <div
      className="card h-100 text-center shadow-sm p-3 py-0 brand-card"
      style={{
        borderRadius: "0.75rem",
        cursor: "pointer",
        transition: "all 0.3s",
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
      onClick={() => onClick(brand.name)}
    >
      <img
        src={brand.logo}
        alt={brand.name}
        className="mx-auto brands-icons brand-img"
        style={{}}
      />
      <h6 className="fw-semibold brand-name">{brand.name}</h6>
    </div>
  );
}

function PartCard({ part, onAdd }) {
  return (
    <div className="card shadow-sm h-100 p-3">
      <img
        src={part.image || noimg}
        alt={part.name}
        className="card-img-top mb-3"
        style={{ height: 120, objectFit: "contain" }}
      />
      <h6>{part.name}</h6>
      <p className="text-secondary small">{part.brand}</p>
      <div className="d-flex justify-content-between align-items-center">
        <p className="fw-bold mb-0">Disponível:</p>
        <span
          className={`badge ${part.disponivel ? "bg-success" : "bg-danger"}`}
        >
          {part.disponivel ? "Sim" : "Não"}
        </span>
      </div>
      <button
        className="btn btn-sm adicionar-carrinho mt-2 w-100"
        onClick={() => onAdd(part)}
      >
        {part.disponivel ? "Adicionar ao Carrinho" : "Encomendar"}
      </button>
    </div>
  );
}

export default function HomeAutoPecas() {
  const [query, setQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [carrinho, setCarrinho] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const containerRef = useRef(null);

  const filteredParts = CAR_PARTS.filter((p) => {
    const matchesBrand = !selectedBrand || p.brand === selectedBrand;
    const matchesQuery =
      query.trim() === "" ||
      normalizeText(`${p.name} ${p.brand}`).includes(normalizeText(query));
    return matchesBrand && matchesQuery;
  });

  useEffect(() => {
    if (query.trim() !== "") {
      const timeout = setTimeout(() => {
        containerRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [query]);

  const adicionarCarrinho = (produto) => setCarrinho([...carrinho, produto]);
  const removerProduto = (id) =>
    setCarrinho(carrinho.filter((p) => p.id !== id));
  const enviarPedido = () => {
    const lista = carrinho.map((p) => `${p.name} - ${p.brand}`).join("\n");
    window.location.href = `mailto:autopecas@empresa.com?subject=Pedido de Peças&body=Olá, gostaria de fazer o pedido:\n\n${lista}`;
  };

  return (
    <div className="bg-tertiary text-dark min-vh-100">
      <Header onSearch={setQuery} carrinho={carrinho} setShowCart={setShowCart} />
      <main className="pt-5">
        <Hero />
        <button
          className="btn btn-dark ms-3 shopping-button"
          onClick={() => setShowCart(true)}
        >
          <FaShoppingCart />
          {carrinho.length > 0 && (
            <span className="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-pill">
              {carrinho.length}
            </span>
          )}
        </button>
        {/* Marcas de Carros */}
        <section id="brand" className="px-3 px-md-5 py-3">
          <h3 className="h5 text-light mb-4">Marcas de Carros</h3>
          <div className="row g-1 g-lg-4 g-md-4 g-sm-1">
            {CAR_BRANDS.map((brand) => (
              <div key={brand.id} className=" col-3 col-lg-3 col-sm-6 col-md-6 ">
                <BrandCard brand={brand} onClick={setSelectedBrand} />
              </div>
            ))}
          </div>
        </section>

        {/* Marcas de Artigos */}
        <section className="px-3 px-md-5 py-3">
          <h3 className="h5 text-light mb-4">Marcas de Artigos</h3>
          <div className="row g-1 g-md-4">
            {ARTICLE_BRANDS.map((brand) => (
              <div key={brand.id} className="col-3 col-lg-2 col-sm-6 col-md-6 ">
                <BrandCard brand={brand} onClick={setSelectedBrand} />
              </div>
            ))}
          </div>
        </section>

        {/* Peças */}
        <section ref={containerRef} id="parts-container" className="px-3 px-md-5 py-5">
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-4 gap-3">
            <h3 className="h5 mb-0">
              {selectedBrand ? `Peças da ${selectedBrand}` : "Todas as Peças"}
            </h3>
            {selectedBrand && (
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setSelectedBrand(null)}
              >
                Ver todas
              </button>
            )}
          </div>
          <div className="row g-2 g-md-4">
            {filteredParts.length > 0 ? (
              filteredParts.map((part) => (
                <div key={part.id} className="col-6 col-lg-2 col-sm-6 col-md-4 col-lg-3">
                  <PartCard part={part} onAdd={adicionarCarrinho} />
                </div>
              ))
            ) : (
              <p className="text-center text-muted fw-semibold mt-3">
                🚫 Nenhuma peça encontrada.
              </p>
            )}
          </div>
        </section>

        {/* Carrinho */}
        {showCart && (
          <div
            className="position-fixed top-0 end-0 bg-semi-transparent shadow-lg p-4"
            style={{ width: "350px", height: "100vh", zIndex: 2050, overflow:'hidden' }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4>Carrinho</h4>
              <FaTimes
              color="red"
              size={20}
                style={{ cursor: "pointer" }}
                onClick={() => setShowCart(false)}
              />
            </div>

            {carrinho.length === 0 ? (
              <p className="text-muted">Carrinho vazio</p>
            ) : (
              <>
                <ul className="list-group mb-3">
                  {carrinho.map((item, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <strong>{item.name}</strong>
                        <br />
                        <small>{item.brand}</small>
                      </div>
                      <FaTrash
                        size={"1rem"}
                        color="red"
                        onClick={() => removerProduto(item.id)}
                      >

                      </FaTrash>
                    </li>
                  ))}
                </ul>
                <button className="btn btn-success w-100" onClick={enviarPedido}>
                  Fazer Pedido via Email
                </button>
              </>
            )}
          </div>
        )}

      </main>
      {/* Footer */}
      <footer id="contact" className="bg-dark text-light mt-5">
        <div className="container py-5 px-3 px-md-5 row row-cols-1 row-cols-md-3 g-4">
          <div>
            <h6 className="text-white fw-bold">AutoPeças Express</h6>
            <p className="small">
              A loja que entende seu carro. Atendimento humano, estoque real.
            </p>
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
        <div className="text-center small text-secondary py-3">
          © {new Date().getFullYear()} AutoPeças Express — Todos os direitos reservados
        </div>
      </footer>
    </div>

  );
}
