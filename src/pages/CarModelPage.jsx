import { Header } from "../components/Header";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaArrowLeft, FaSearch, FaCar, FaHeadset, FaFilter, FaCog, FaArrowRight } from "react-icons/fa";
import { Footer } from "../components/Footer";
import Loader from "../components/Loading_Component";

// Dados das marcas exatamente no padrão fornecido
const CAR_BRANDS = [
  {
    "id": 1,
    "name": "Toyota",
    "logo": "https://global.toyota/pages/global_toyota/mobility/toyota-brand/emblem_001.jpg",
    "models": ["Corolla", "Hilux", "Yaris"],
    "founded": 1980,
    "country": "Japan"
  },
  {
    "id": 2,
    "name": "BMW",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg",
    "models": ["X5", "M3", "i8"],
    "founded": 1899,
    "country": "Germany"
  },
  {
    "id": 3,
    "name": "Mercedes",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg",
    "models": ["C-Class", "E-Class", "S-Class"],
    "founded": 1926,
    "country": "Germany"
  },
];

// Gerar modelos automaticamente baseado nas marcas
const generateModelsFromBrands = () => {
  const modelsData = {};

  CAR_BRANDS.forEach(brand => {
    const brandKey = brand.name.toLowerCase();
    modelsData[brandKey] = brand.models.map((modelName, index) => {
      // Gerar categoria baseada no modelo
      const getCategory = (model) => {
        if (model.includes('X') || model.includes('SUV')) return 'SUV';
        if (model.includes('M') || model.includes('i8')) return 'Esportivo';
        if (model.includes('Class')) return 'Luxo';
        if (model.includes('Hilux')) return 'Picape';
        if (model.includes('Yaris')) return 'Hatch';
        return 'Sedan';
      };

      // Imagens genéricas por categoria
      const getImageByCategory = (category) => {
        const images = {
          'SUV': 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop',
          'Sedan': 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop',
          'Hatch': 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop',
          'Picape': 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=300&fit=crop',
          'Esportivo': 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop',
          'Luxo': 'https://images.unsplash.com/photo-1563720223485-2442d6a4cf83?w=400&h=300&fit=crop'
        };
        return images[category] || images['Sedan'];
      };

      const category = getCategory(modelName);

      return {
        id: brand.id * 10 + index + 1, // IDs únicos
        name: modelName,
        image: getImageByCategory(category),
        category: category
      };
    });
  });

  return modelsData;
};

export default function CarModelPage() {
  const { brandName } = useParams();
  const [models, setModels] = useState([]);
  const [brandInfo, setBrandInfo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [loading, setLoading] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);
  const navigate = useNavigate()

  // Detectar mudanca de tela
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileView(window.innerWidth < 992);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    // Rolar para o topo quando a marca mudar
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [brandName]);

  useEffect(() => {
    // Simular carregamento de dados
    setTimeout(() => {
      const modelsData = generateModelsFromBrands();
      const brandData = modelsData[brandName] || [];
      
      // Buscar informações da marca diretamente do CAR_BRANDS
      const foundBrand = CAR_BRANDS.find(brand => 
        brand.name.toLowerCase() === brandName.toLowerCase()
      );

      const info = foundBrand || {
        name: brandName.charAt(0).toUpperCase() + brandName.slice(1),
        founded: 1900,
        country: "Internacional",
        logo: "",
        models: []
      };

      setModels(brandData);
      setBrandInfo(info);
      setLoading(false);
    }, 500);
  }, [brandName]);

  // Filtrar e ordenar modelos
  const filteredModels = models
    .filter(model => {
      const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || model.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

  // Categorias únicas
  const categories = ["all", ...new Set(models.map(model => model.category))];

  // Função para tratar erro de imagem
  const handleImageError = (e, modelName) => {
    console.warn(`Erro ao carregar imagem para ${modelName}`);
    e.target.src = 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop';
    e.target.alt = `Imagem padrão para ${modelName}`;
  };

  // Função para navegação do modelo
  const handleModelClick = (model) => {
    // Salvar estado no sessionStorage para recuperar depois
    sessionStorage.setItem('lastViewedBrand', brandName);
    
    navigate(`/modelo/${model.name}`, {
      state: { 
        model,
        brand: brandInfo,
        returnUrl: `/marcas/${brandName}`
      }
    });
  };

  if (loading) {
    return (
      <Loader/>
    );
  }

  if (!brandInfo || models.length === 0) {
    return (
      <>
        <Header />
        <div className="min-vh-100 bg-dark pt-5">
          <div className="container py-5">
            <div className="text-center py-5">
              <h2>Marca não encontrada</h2>
              <p>Não encontramos modelos para a marca {brandName}.</p>
              <Link to="/marcas" className="btn btn-primary">
                <FaArrowLeft className="me-2" />
                Voltar para Marcas
              </Link>
            </div>
          </div>
        </div>
      </>
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
            <div className="col-md-8">
              <Link to="/marcas" className="btn btn-outline-light btn-sm mb-3">
                <FaArrowLeft className="me-2" />
                Voltar para Marcas
              </Link>
              <h1 className="display-4 fw-bold mb-3 text-primary">{brandInfo.name}</h1>
              {!isMobileView &&
                <div className="row text-center">
                  <div className="col-4">
                    <div className="text-danger fw-bold fs-3">{models.length}</div>
                    <div className="text-light small">Modelos</div>
                  </div>
                  <div className="col-4">
                    <div className="text-danger fw-bold fs-3">{brandInfo.founded}</div>
                    <div className="text-light small">Fundação</div>
                  </div>
                  <div className="col-4">
                    <div className="text-danger fw-bold fs-3">{brandInfo.country}</div>
                    <div className="text-light small">País</div>
                  </div>
                </div>
              }
            </div>

            <div className="col-md-4 text-center">
              {brandInfo.logo && (
                <img
                  src={brandInfo.logo}
                  alt={`Logo ${brandInfo.name}`}
                  className="img-fluid"
                  style={{ maxHeight: '150px' }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150x150/333333/FFFFFF?text=LOGO';
                  }}
                />
              )}
            </div>
            {isMobileView &&
              <div className="row text-center pt-4">
                <div className="col-4">
                  <div className="text-danger fw-bold fs-3">{models.length}</div>
                  <div className="text-light small">Modelos</div>
                </div>
                <div className="col-4">
                  <div className="text-danger fw-bold fs-3">{brandInfo.founded}</div>
                  <div className="text-light small">Fundação</div>
                </div>
                <div className="col-4">
                  <div className="text-danger fw-bold fs-3">{brandInfo.country}</div>
                  <div className="text-light small">País</div>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      {/* Filtros e Busca */}
      <section className="py-4  h-100 position-relative container-fluid">
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
        <div className="container text-light">
          <div className="row g-3 align-items-center">
            <div className="col-12 position-relative">
              <h1 className="text-light">Modelos disponíveis</h1>
            </div>
            <div className="col-lg-6">
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <FaSearch className="text-secondary" />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Buscar modelos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Buscar modelos"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Modelos */}
        <div className="container position-relative">
          <div className="row ">
            <div className="col-12 ">
              <h2 className="h4 mb-4 text-secondary pt-3">
                <span className={filteredModels.length > 0 ? 'text-primary': 'text-danger' }>{filteredModels.length}</span> modelo{filteredModels.length !== 1 ? 's' : ''} encontrado{filteredModels.length !== 1 ? 's' : ''}
              </h2>
            </div>
          </div>

          {filteredModels.length === 0 ? (
            <div className="text-center py-5">
              <FaCar size={64} className="text-secondary mb-3" />
              <h3 className="text-light">Nenhum modelo encontrado</h3>
              <p className="text-secondary">Tente ajustar os filtros ou termos de busca.</p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
              >
                Limpar Filtros
              </button>
            </div>
          ) : (
            <div className="row g-4">
              {filteredModels.map(model => (
                <div key={model.id} className="col-xl-4 col-lg-6 col-md-6">
                  <div 
                    className="card h-100" 
                    style={{
                      background: '#2f3c4e3e',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '2px 5px 5px #26252f',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleModelClick(model)}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => e.key === 'Enter' && handleModelClick(model)}
                  >
                    <div className="position-relative">
                      <img
                        src={model.image}
                        alt={`${model.name} - ${model.category}`}
                        className="card-img-top"
                        style={{ height: '200px', objectFit: 'cover' }}
                        onError={(e) => handleImageError(e, model.name)}
                        loading="lazy"
                      />
                      <div className="position-absolute top-0 end-0 m-3">
                        <span className="badge bg-danger">{model.category}</span>
                      </div>
                    </div>

                    <div className="card-body d-flex flex-column text-light">
                      <h5 className="card-title">{model.name}</h5>
                      <div className="mt-auto">
                        <div className="d-flex align-items-center text-secondary small mb-3">
                          <FaCar className="me-2" />
                          {model.category}
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="btn btn-primary btn-sm">
                            Ver peças <FaArrowRight className="ms-2" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
      <style jsx>{`
        .card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
        }
        
        .badge {
          font-size: 0.75rem;
        }
      `}</style>
    </>
  );
}