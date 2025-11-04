import React, { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    FaArrowLeft,
    FaShoppingCart,
    FaCar,
    FaLightbulb,
    FaChair,
    FaTools,
    FaTachometerAlt,
    FaMusic,
    FaShieldAlt,
    FaBolt,
    FaSearch,
    FaHeadset,
    FaAward
} from "react-icons/fa";
import noimg from "../assets/noimg.png";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FaFilter } from "react-icons/fa6";
import engineIcon from "../assets/icons/engine.svg";
import suspensionIcon from "../assets/icons/suspension.svg";
import brakesIcon from "../assets/icons/break.svg";
import CarLight from "../assets/icons/car-light.svg";
import battery from "../assets/icons/battery.svg";
import seatIcon from "../assets/icons/seat.svg";
import OilFilter from "../assets/icons/oil-filter.svg";
import TodasCategory from "../assets/icons/todas.svg";


// Categorías com ícones
const CATEGORIES = [
    { id: 'all', name: 'Todas as Peças', icon:<img src={TodasCategory} width={40} height={40} style={{transform:"rotate(90deg)"}}/> , color: '#3b82f6' },
    { id: 'motor', name: 'Motor', icon: <img src={engineIcon} alt="Motor" width={40} height={40}  />, color: '#dc3545' },
    { id: 'filtros', name: 'Filtros', icon: <img src={OilFilter} alt="Motor" width={40} height={40}  />, color: '#494e58ff' },
    { id: 'farois', name: 'Faróis', icon: <img src={CarLight} alt="Motor" width={40} height={40}  />, color: '#ffc107' },
    { id: 'interior', name: 'Interior', icon:<img src={seatIcon} alt="Motor" width={40} height={40}  />, color: '#28a745' },
    { id: 'suspensao', name: 'Suspensão', icon: <img src={suspensionIcon} alt="Motor" width={40} height={40}  />, color: '#6f42c1' },
    { id: 'travoes', name: 'Travões', icon: <img src={brakesIcon} alt="Motor" width={40} height={40}  />, color: '#fd7e14' },
    { id: 'eletrica', name: 'Elétrica', icon:<img src={battery} alt="Motor" width={40} height={40}  />, color: '#20c997' }
   
];

// Imagens reais dos modelos de carro
const CAR_MODEL_IMAGES = {
    "Corolla": "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&h=400&fit=crop",
    "Hilux": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=400&fit=crop",
    "Yaris": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop",
    "X5": "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop",
    "M3": "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop",
    "i8": "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&h=400&fit=crop",
    "C-Class": "https://images.unsplash.com/photo-1563720223485-2442d6a4cf83?w=600&h=400&fit=crop",
    "E-Class": "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=600&h=400&fit=crop",
    "S-Class": "https://images.unsplash.com/photo-1563720223180-4512f66a0f23?w=600&h=400&fit=crop"
};

const PartCard = ({ part, onAdd }) => (
    <div className="card h-100 border-0 part-card" style={{
        background: '#2f3c4e3e',
        backdropFilter: 'blur(10px)',
        boxShadow: '2px 5px 5px #26252f'
    }}>
        <div className="position-relative">
            <img
                src={part.image || noimg}
                alt={part.name}
                className="card-img-top"
                style={{
                    height: '180px',
                    objectFit: 'contain',
                    padding: '1rem'
                }}
                loading="lazy"
            />
            <div className="position-absolute top-0 end-0 m-2">
                <span className={`badge ${part.available ? "bg-success" : "bg-danger"}`}>
                    {part.available ? "Em estoque" : "Sob encomenda"}
                </span>
            </div>
        </div>

        <div className="card-body d-flex flex-column text-light">
            <h6 className="card-title fw-bold mb-2">{part.name}</h6>
            <p className="text-secondary small mb-3">{sessionStorage.getItem("LastViewedBrand")}</p>

            <div className="mt-auto">
                <button
                    className="btn btn-sm w-100"
                    onClick={() => onAdd(part)}
                    disabled={!part.available}
                    style={{
                        background: part.available
                            ? 'linear-gradient(45deg, #10192b, #1d3557ff, #3a5f9bff)'
                            : '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '0.5rem 1rem'
                    }}
                >
                    {part.available ? "Adicionar ao Carrinho" : "Consultar disponibilidade"}
                </button>
            </div>
        </div>
    </div>
);

const CategoryCard = ({ category, isSelected, onClick, count }) => (
    <div
        className={`card h-100 text-center border-0 category-card ${isSelected ? 'selected' : ''}`}
        style={{
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            background: isSelected
                ? 'linear-gradient(45deg, #10192b, #1d3557ff, #3a5f9bff)'
                : '#2f3c4e3e',
            backdropFilter: 'blur(10px)',
            boxShadow: '2px 5px 5px #26252f',
            color: isSelected ? 'white' : 'inherit'
        }}
        onClick={onClick}
    >
        <div className="card-body d-flex flex-column justify-content-between align-items-center ">
            <div className="mb-2">
                {category.icon}
            </div>
            <h6 className="fw-semibold mb-2 text-light text-center" style={{ fontSize: '0.75rem' }}>
                {category.name}
            </h6>
            <span
                className={`badge ${count < 1 ? 'bg-danger' : 'bg-success text-light'}`}
                style={{ fontSize: '0.75rem' }}
            >
                {count}
            </span>
        </div>
    </div>
);

export default function ModelPage() {
    const { modelName } = useParams();
    const navigate = useNavigate();
    const [carrinho, setCarrinho] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [query, setQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState('all');
    const debounceRef = useRef(null);
    const [modelParts, setModelParts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Carregar carrinho do localStorage
    useEffect(() => {
        const carrinhoSalvo = localStorage.getItem("carrinho");
        if (carrinhoSalvo) {
            setCarrinho(JSON.parse(carrinhoSalvo));
        }
    }, []);

    const handleSearch = useCallback((value) => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => setQuery(value), 220);
    }, []);

    useEffect(() => {
        async function carregarDados() {
            try {
                setLoading(true);
                const response = await fetch(`${import.meta.env.VITE_API_URL}/model/${modelName}/part`);

                if (!response.ok) {
                    throw new Error('Erro ao carregar peças');
                }

                const data = await response.json();
                setModelParts(data || []);
            } catch (error) {
                console.error("Erro ao carregar peças:", error);
                setModelParts([]);
            } finally {
                setLoading(false);
            }
        }

        carregarDados();
    }, [modelName]);

    const parts = useMemo(() => {
        let filteredParts = Array.isArray(modelParts) ? modelParts : [];

        // Filtrar por categoria
        if (selectedCategory !== 'all') {
            filteredParts = filteredParts.filter(part => part.category === selectedCategory);
        }

        // Filtrar por busca
        if (query) {
            const normalizedQuery = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            filteredParts = filteredParts.filter(part =>
                part.name?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(normalizedQuery) ||
                part.brand?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(normalizedQuery)
            );
        }

        return filteredParts;
    }, [modelParts, query, selectedCategory]);

    const adicionarCarrinho = (produto) => {
        if (!produto.available) return;

        setCarrinho((prev) => {
            const novoCarrinho = [...prev, produto];
            localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
            return novoCarrinho;
        });
    };

    const removerProduto = (id) => {
        setCarrinho((prev) => {
            const novoCarrinho = prev.filter((p) => p.id !== id);
            localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
            return novoCarrinho;
        });
    };

    const enviarPedido = () => {
        if (carrinho.length === 0) return;

        const lista = carrinho.map((item, index) =>
            `#${index + 1}:=> ${item.name} -- -- -- -- ${item.brand}`
        ).join('\n');

        window.location.href = `mailto:autopecas@empresa.com?subject=Pedido para peças ${modelName}&body=Olá, gostaria de fazer o pedido para ${modelName}:\n\n${lista}\n\nTotal de itens: ${carrinho.length}`;
    };

    const getCategoryCount = (categoryId) => {
        if (categoryId === 'all') return modelParts.length;
        return modelParts.filter(part => part.category === categoryId).length;
    };

    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);
        setTimeout(() => {
            window.scrollTo({
                top: window.scrollY + 400,
                behavior: 'smooth'
            });
        }, 100);
    };

    const pecasEmEstoque = modelParts.filter(p => p.available).length;
    const categoriasDisponiveis = CATEGORIES.filter(cat => getCategoryCount(cat.id) > 0).length;

    // Show loading state
    if (loading) {
        return (
            <>
                <Header />
                <section className="min-vh-100 bg-dark d-flex justify-content-center align-items-center">
                    <div className="text-center text-white">
                        <div className="spinner-border text-primary mb-3" role="status">
                            <span className="visually-hidden">Carregando...</span>
                        </div>
                        <p>Carregando peças para {modelName}...</p>
                    </div>
                </section>
            </>
        );
    }

    return (
        <>
            <Header />

            {/* Hero Section */}
            <section className="text-white py-5" style={{
                background: "linear-gradient(45deg, #10192b, #1d3557ff, #3a5f9bff)",
            }}>
                <div className="container pt-5">
                    <div className="row align-items-center">
                        <div className="col-lg-8">
                            <button
                                className="btn btn-outline-light btn-sm mb-4"
                                onClick={() => navigate("/marcas")}
                            >
                                <FaArrowLeft className="me-2" />
                                Voltar para Marcas
                            </button>
                            <h1 className="display-4 fw-bold mb-3">
                                Peças para <span className="text-primary">{modelName}</span>
                            </h1>
                            <p className="lead mb-4 fs-5">
                                {`Encontre as melhores peças para o seu ${modelName}. Peças originais e compatíveis com garantia de qualidade.`}
                            </p>
                            <div className="row text-center">
                                <div className="col-4">
                                    <div className="text-primary fw-bold fs-3">
                                        {categoriasDisponiveis}
                                    </div>
                                    <div className="text-light small">Categorias</div>
                                </div>
                                <div className="col-4">
                                    <div className="text-primary fw-bold fs-3">
                                        {pecasEmEstoque}
                                    </div>
                                    <div className="text-light small">Peças em Estoque</div>
                                </div>
                                <div className="col-4">
                                    <div className="text-primary fw-bold fs-3">
                                        {modelParts.length}
                                    </div>
                                    <div className="text-light small">Total de Peças</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 text-center">
                            <div className="position-relative">
                                <div
                                    className="rounded-circle mx-auto"
                                    style={{
                                        width: '250px',
                                        height: '250px',
                                        background: 'linear-gradient(135deg, rgba(11, 245, 245, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
                                        border: '2px solid rgba(255, 255, 255, 0.1)',
                                        backdropFilter: 'blur(10px)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <FaCar 
                                        size={80} 
                                        color="lightblue" 
                                        style={{
                                            opacity: 0.8
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Busca e Filtros */}
            <section className="container-fluid position-relative py-5" style={{ minHeight: '100vh' }}>
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

                <div className="container position-relative">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="input-group input-group-lg">
                                <span className="input-group-text bg-light border-end-0">
                                    <FaSearch className="text-secondary" />
                                </span>
                                <input
                                    type="text"
                                    className="form-control border-start-0"
                                    placeholder="Buscar peças..."
                                    value={query}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    style={{ fontSize: '1.1rem' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Categorias */}
                <div className="container position-relative pt-5 text-light">
                    <div className="row mb-3">
                        <div className="col-12">
                            <h5 className="fw-bold mb-3">Filtrar por Categoria</h5>
                        </div>
                    </div>
                    <div className="row g-3">
                        {CATEGORIES.map((category) => (
                            <div key={category.id} className="col-6 col-sm-4 col-md-3 col-lg-2">
                                <CategoryCard
                                    category={category}
                                    isSelected={selectedCategory === category.id}
                                    onClick={() => handleCategoryClick(category.id)}
                                    count={getCategoryCount(category.id)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Lista de Peças */}
                <div className="container position-relative pt-5">
                    <div className="row mb-4">
                        <div className="col-12">
                            <h2 className="h3 mb-2 text-light">
                                Peças Disponíveis
                            </h2>
                            <p className="text-secondary">
                                {parts.length} {parts.length === 1 ? 'peça encontrada' : 'peças encontradas'}
                                {selectedCategory !== 'all' && ` em ${CATEGORIES.find(cat => cat.id === selectedCategory)?.name}`}
                                {query && ` para "${query}"`}
                            </p>
                        </div>
                    </div>

                    {parts.length > 0 ? (
                        <div className="row g-4">
                            {parts.map((part) => (
                                <div key={part.id} className="col-xl-3 col-lg-4 col-md-6">
                                    <PartCard part={part} onAdd={adicionarCarrinho} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-5">
                            <FaCar size={64} className="text-secondary mb-3" />
                            <h3 className="text-light">Nenhuma peça encontrada</h3>
                            <p className="text-secondary mb-4">
                                {query
                                    ? `Não encontramos peças para "${query}" em ${modelName}`
                                    : selectedCategory !== 'all'
                                        ? `Não encontramos peças na categoria ${CATEGORIES.find(cat => cat.id === selectedCategory)?.name} para ${modelName}`
                                        : `Não encontramos peças disponíveis para ${modelName}`
                                }
                            </p>
                            {(query || selectedCategory !== 'all') && (
                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        setQuery("");
                                        setSelectedCategory('all');
                                    }}
                                >
                                    Limpar Filtros
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* Botão flutuante do carrinho */}
            {carrinho.length > 0 && (
                <button
                    className="btn position-fixed"
                    onClick={() => setShowCart(true)}
                    style={{
                        top: "100px",
                        right: "20px",
                        zIndex: 1040,
                        borderRadius: "50%",
                        width: "60px",
                        height: "60px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "linear-gradient(45deg, #10192b, #1d3557ff, #3a5f9bff)",
                        border: "none",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
                    }}
                >
                    <FaShoppingCart size={20} className="text-white" />
                    <span
                        className="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-pill"
                        style={{ fontSize: "0.7rem" }}
                    >
                        {carrinho.length}
                    </span>
                </button>
            )}

            {/* Carrinho Sidebar */}
            {showCart && (
                <div className="position-fixed top-0 start-0 w-100 h-100" style={{ zIndex: 2050, background: "rgba(0,0,0,0.5)" }} onClick={() => setShowCart(false)}>
                    <div className="position-absolute top-0 end-0 h-100 p-4" style={{
                        width: "350px",
                        overflow: "auto",
                        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                        color: 'white'
                    }} onClick={(e) => e.stopPropagation()}>
                        <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
                            <h5 className="mb-0">Carrinho</h5>
                            <button className="btn btn-sm btn-outline-light" onClick={() => setShowCart(false)}>×</button>
                        </div>

                        {carrinho.length === 0 ? (
                            <p className="text-secondary text-center py-5">Carrinho vazio</p>
                        ) : (
                            <>
                                <div className="mb-3">
                                    <p className="small text-secondary">
                                        {carrinho.length} {carrinho.length === 1 ? 'item' : 'itens'} no carrinho
                                    </p>
                                    {carrinho.map((item, index) => (
                                        <div key={`${item.id}-${index}`} className="card mb-2 border-0" style={{
                                            background: '#2f3c4e3e',
                                            backdropFilter: 'blur(10px)'
                                        }}>
                                            <div className="card-body py-2">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="flex-grow-1">
                                                        <h6 className="mb-1 text-light">{item.name}</h6>
                                                        <small className="text-secondary">{item.brand}</small>
                                                    </div>
                                                    <button
                                                        className="btn btn-sm btn-outline-light"
                                                        onClick={() => removerProduto(item.id)}
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    className="btn w-100 py-2 fw-semibold"
                                    onClick={enviarPedido}
                                    style={{
                                        background: "linear-gradient(45deg, #10192b, #1d3557ff, #3a5f9bff)",
                                        border: "none",
                                        borderRadius: "8px",
                                        color: 'white'
                                    }}
                                >
                                    📧 Fazer Pedido por Email
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}

            <Footer />

            <style jsx>{`
                .part-card {
                    transition: all 0.3s ease;
                }

                .part-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.3) !important;
                }

                .category-card {
                    transition: all 0.3s ease;
                }

                .category-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 25px rgba(0,0,0,0.2) !important;
                }

                .category-card.selected {
                    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3) !important;
                }

                @media (max-width: 768px) {
                    .display-4 {
                        font-size: 2.5rem;
                    }
                }
            `}</style>
        </>
    );
}