import { Header } from "../components/Header";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaSearch, FaTools, FaAward, FaBox, FaArrowRight, FaFirstAid, FaShieldAlt, FaSprayCan, FaFilter, FaTimes } from "react-icons/fa";
import { Footer } from "../components/Footer";
import Loader from "../components/Loading_Component";

export default function ArticlesPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [isMobileView, setIsMobileView] = useState(false);
    const [ARTICLES, setARTICLES] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [showFilters, setShowFilters] = useState(false);

    // Função para obter ícone baseado na categoria
    const getCategoryIcon = (category) => {
        switch (category) {
            case 'seguranca':
                return <FaShieldAlt size={16} className="text-warning " />;
            case 'limpesa':
                return <FaSprayCan size={16} className="text-info" />;
            case 'utilidade':
                return <FaTools size={16} className="text-success" />;
            default:
                return <FaBox size={16} className="text-secondary" />;
        }
    };

    // Função para obter label da categoria
    const getCategoryLabel = (category) => {
        switch (category) {
            case 'seguranca':
                return 'Segurança';
            case 'limpesa':
                return 'Limpeza';
            case 'utilidade':
                return 'Utilidade';
            default:
                return category;
        }
    };

    // Função para obter cor da categoria
    const getCategoryColor = (category) => {
        switch (category) {
            case 'seguranca':
                return 'warning';
            case 'limpesa':
                return 'info';
            case 'utilidade':
                return 'success';
            default:
                return 'secondary';
        }
    };

    // Obter categorias únicas dos artigos
    const getUniqueCategories = () => {
        const categories = [...new Set(ARTICLES.map(article => article.category))];
        return categories;
    };
    console.log("Categorias únicas:", getUniqueCategories());

    useEffect(() => {
        async function carregarDados() {
            try {
                setLoading(true);
                const response = await fetch('http://192.168.1.139:8000/universal-article/');
                if (!response.ok) throw new Error('Erro ao carregar artigos');
                const data = await response.json();

                setARTICLES(data);
                setFilteredArticles(data);
                setLoading(false);

            } catch (error) {
                console.error("Erro ao carregar artigos:", error);
                // Dados de fallback baseados na sua estrutura
                const fallbackData = [
                    {
                        "id": 1,
                        "name": "Kit de Primeiros Socorros",
                        "desc": "Um kit de primeiros socorros de tamanho pequeno para a sua viatura",
                        "category": "seguranca",
                        "image": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=300&fit=crop"
                    },
                    {
                        "id": 2,
                        "name": "Aspirador de Pó",
                        "desc": "Aspirador de pó portátil para manter o teu carro limpo.",
                        "category": "limpesa",
                        "image": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&h=300&fit=crop"
                    },
                    {
                        "id": 3,
                        "name": "Forro de Bancos",
                        "desc": "Forro feito de pele sintética resistente à água.",
                        "category": "utilidade",
                        "image": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300&h=300&fit=crop"
                    },
                    {
                        "id": 4,
                        "name": "Extintor de Incêndio",
                        "desc": "Extintor portátil para emergências no veículo.",
                        "category": "seguranca",
                        "image": "https://images.unsplash.com/photo-1577896849785-51ffb238c9c4?w=300&h=300&fit=crop"
                    },
                    {
                        "id": 5,
                        "name": "Kit de Limpeza Interior",
                        "desc": "Kit completo para limpeza do interior do veículo.",
                        "category": "limpesa",
                        "image": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&h=300&fit=crop"
                    },
                    {
                        "id": 6,
                        "name": "Organizador de Porta-luvas",
                        "desc": "Organizador prático para o compartimento do porta-luvas.",
                        "category": "utilidade",
                        "image": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300&h=300&fit=crop"
                    }
                ];
                setARTICLES(fallbackData);
                setFilteredArticles(fallbackData);
                setLoading(false);
            }
        }

        carregarDados();
    }, []);

    useEffect(() => {
        // Detectar mudança de tela
        const checkScreenSize = () => {
            setIsMobileView(window.innerWidth < 992);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    useEffect(() => {
        const filtered = ARTICLES.filter(article => {
            const matchesSearch =
                article.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                article.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
                article.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                getCategoryLabel(article.category).toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
        setFilteredArticles(filtered);
    }, [searchTerm, selectedCategory, ARTICLES]);

    const handleCategoryFilter = (category) => {
        setSelectedCategory(category);
        if (isMobileView) {
            setShowFilters(false);
        }
    };

    const clearFilters = () => {
        setSelectedCategory("all");
        setSearchTerm("");
    };

    const hasActiveFilters = selectedCategory !== "all" || searchTerm !== "";

    if (loading) {
        return <Loader />;
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
                                    <FaBox className="text-warning" size={32} />
                                </div>
                            </div>
                            <h1 className="display-4 fw-bold mb-3">
                                <span className="text-primary">Artigos</span> Universais
                            </h1>
                            <p className="lead mb-4 fs-5">
                                Descubra acessórios e produtos essenciais para o seu veículo.
                            </p>
                            {!isMobileView &&
                                <div className="row text-center">
                                    <div className="col-4">
                                        <div className="text-info fw-bold fs-3">{ARTICLES.length}</div>
                                        <div className="text-light small">Artigos</div>
                                    </div>
                                    <div className="col-4">
                                        <div className="text-info fw-bold fs-3">
                                            {getUniqueCategories().length}
                                        </div>
                                        <div className="text-light small">Categorias</div>
                                    </div>
                                    <div className="col-4">
                                        <div className="text-info fw-bold fs-3">100%</div>
                                        <div className="text-light small">Qualidade</div>
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
                                    <FaTools size={24} className="text-primary" />
                                    <FaFirstAid size={64} className="text-info" />
                                    <FaTools size={24} className="text-primary" />
                                </div>
                            </div>
                        </div>
                        {isMobileView &&
                            <div className="row text-center pt-4">
                                <div className="col-4">
                                    <div className="text-info fw-bold fs-3">{ARTICLES.length}</div>
                                    <div className="text-light small">Artigos</div>
                                </div>
                                <div className="col-4">
                                    <div className="text-info fw-bold fs-3">
                                        {getUniqueCategories().length}
                                    </div>
                                    <div className="text-light small">Categorias</div>
                                </div>
                               
                                <div className="col-4">
                                    <div className="text-info fw-bold fs-3">100%</div>
                                    <div className="text-light small">Qualidade</div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </section>

            {/* Busca e Filtros */}
            <section className="container-fluid h-100 position-relative py-4">
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

                <div className="container">
                    <div className="row justify-content-center">
                        {isMobileView &&
                            <div className="col-12 position-relative text-light pt-0">
                                <h2 className="h3 mb-2 py-3">
                                    Todos os Artigos
                                </h2>
                                <p className="text-secondary">
                                    {filteredArticles.length} artigo{filteredArticles.length !== 1 ? 's' : ''} encontrado{filteredArticles.length !== 1 ? 's' : ''}
                                    {hasActiveFilters && " (filtros ativos)"}
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
                                    placeholder="Buscar artigo, descrição ou categoria..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{ fontSize: '1.1rem' }}
                                />
                                <button
                                    className="btn btn-outline-primary d-lg-none"
                                    type="button"
                                    onClick={() => setShowFilters(!showFilters)}
                                >
                                    <FaFilter size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Filtros de Categoria */}
                        <div className={`position-relative col-12 mt-3 ${isMobileView ? (showFilters ? 'd-block' : 'd-block') : 'd-block'}`}>
                            <div className="d-flex flex-wrap gap-2 align-items-center">
                                <span className="text-light me-2 small">
                                    <FaFilter size={14} className="me-1" />
                                    Filtrar por:
                                </span>

                                {/* Botão Todas as Categorias */}
                                <button
                                    className={`btn btn-sm ${selectedCategory === "all" ? 'btn-primary' : 'btn-outline-primary'}`}
                                    onClick={() => handleCategoryFilter("all")}
                                >
                                    Todas as Categorias
                                </button>

                                {/* Botões de Categoria */}
                                {getUniqueCategories().map(category => (
                                    <button
                                        key={category}
                                        className={`btn-category btn border o d-flex align-items-center ${selectedCategory === category
                                                ? `border-info}`
                                                : `border-danger}`
                                            }`}
                                        onClick={() => handleCategoryFilter(category)}
                                    >
                                        {getCategoryIcon(category)}
                                        <span className="badge bg-light text-dark ms-1">
                                            {category}
                                        </span>
                                    </button>
                                ))}

                                {/* Botão Limpar Filtros */}
                                {hasActiveFilters && (
                                    <button
                                        className="btn btn-sm btn-outline-danger ms-2"
                                        onClick={clearFilters}
                                    >
                                        <FaTimes size={12} className="me-1" />
                                        Limpar
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lista de Artigos */}
                <div className="container-fluid position-relative pb-5 text-light">
                    <div className="row mb-4">
                        {!isMobileView &&
                            <div className="col-12">
                                <h2 className="h3 mb-2 py-3">
                                    Todos os Artigos
                                </h2>
                                <p className="text-secondary">
                                    {filteredArticles.length} artigo{filteredArticles.length !== 1 ? 's' : ''} encontrado{filteredArticles.length !== 1 ? 's' : ''}
                                    {hasActiveFilters && " (com filtros aplicados)"}
                                </p>
                            </div>
                        }
                    </div>

                    {filteredArticles.length === 0 ? (
                        <div className="text-center py-5">
                            <FaBox size={64} className="text-secondary mb-3" />
                            <h3>Nenhum artigo encontrado</h3>
                            <p className="text-secondary mb-4">
                                Não encontramos artigos correspondentes aos seus critérios de busca.
                            </p>
                            <button
                                className="btn btn-primary"
                                onClick={clearFilters}
                            >
                                Limpar Filtros
                            </button>
                        </div>
                    ) : (
                        <div className="row g-4">
                            {filteredArticles.map(article => (
                                <div key={article.id} className="col-xl-4 col-lg-6 col-md-6">
                                    <Link
                                        to={`/artigos/${article.id}`}
                                        className="text-decoration-none"
                                    >
                                        <div className="card h-100 article-card" style={{
                                            background: '#2f3c4e3e',
                                            backdropFilter: 'blur(10px)',
                                            boxShadow: '2px 5px 5px #26252f'
                                        }}>
                                            <div className="card-body p-4">
                                                <div className="row align-items-center">
                                                    <div className="col-4">
                                                        <div className="article-image-container">
                                                            <img
                                                                src={article.image || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300&h=300&fit=crop'}
                                                                alt={`Imagem ${article.name}`}
                                                                className="img-fluid rounded-3"
                                                                style={{
                                                                    width: '80px',
                                                                    height: '80px',
                                                                    objectFit: 'cover',
                                                                    padding: '4px',
                                                                    background: 'white',
                                                                    border: '1px solid #dee2e6'
                                                                }}
                                                                onError={(e) => {
                                                                    e.target.src = 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=150&h=150&fit=crop';
                                                                    e.target.style.padding = '0';
                                                                    e.target.style.background = 'transparent';
                                                                    e.target.style.border = 'none';
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-8">
                                                        <h5 className="card-title text-light mb-2">{article.name}</h5>
                                                        <div className="d-flex align-items-center mb-2">
                                                            {getCategoryIcon(article.category)}
                                                            <span className={`badge bg-${getCategoryColor(article.category)} ms-2`}>
                                                                {getCategoryLabel(article.category)}
                                                            </span>
                                                        </div>
                                                        <p className="text-secondary small mb-3" style={{ fontSize: '0.85rem' }}>
                                                            {article.desc}
                                                        </p>
                                                        <div className="d-flex align-items-center text-primary">
                                                            <span className="small fw-semibold">Ver detalhes</span>
                                                            <FaArrowRight size={12} className="ms-2" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Categoria e ID */}
                                            <div className="card-footer bg-transparent border-top-0 pt-0">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <small className="text-secondary">ID: #{article.id}</small>
                                                    <small className={`text-${getCategoryColor(article.category)}`}>
                                                        {getCategoryLabel(article.category)}
                                                    </small>
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
        .btn-category{
             border-radius: 40px;
        }
        .btn-category:hover{
            background-color: rgba(7, 47, 112, 0.85);
        }
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

        .article-card {
          transition: all 0.3s ease;
        }

        .article-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15) !important;
        }

        .article-image-container {
          transition: transform 0.3s ease;
        }

        .article-card:hover .article-image-container {
          transform: scale(1.1);
        }

        @media (max-width: 768px) {
          .article-card {
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