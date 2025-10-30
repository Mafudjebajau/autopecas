import React, { useState, useMemo, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    FaArrowLeft,
    FaShoppingCart,
    FaCog,
    FaCar,
    FaLightbulb,
    FaChair,
    FaTools,
    FaOilCan,
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

// Categorías con íconos
const CATEGORIES = [
    { id: 'all', name: 'Todas as Peças', icon: <FaCar size={20} />, color: '#3b82f6' },
    { id: 'motor', name: 'Motor', icon: <FaCog size={20} />, color: '#dc3545' },
     { id: 'filtros', name: 'Filtros', icon: <FaFilter size={20} />, color: '#494e58ff' },
    { id: 'farois', name: 'farois', icon: <FaLightbulb size={20} />, color: '#ffc107' },
    { id: 'interior', name: 'Interior', icon: <FaChair size={20} />, color: '#28a745' },
    { id: 'suspensao', name: 'Suspensão', icon: <FaShieldAlt size={20} />, color: '#6f42c1' },
    { id: 'travoes', name: 'Travoes', icon: <FaTachometerAlt size={20} />, color: '#fd7e14' },
    { id: 'eletrica', name: 'Elétrica', icon: <FaBolt size={20} />, color: '#20c997' },
    { id: 'acessorios', name: 'Acessórios univesais', icon: <FaMusic size={20} />, color: '#e83e8c' }
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

// Informações adicionais sobre os modelos
const MODEL_INFO = {
    "Corolla": {
        brand: "Toyota",
        year: "2024",
    },
    "Hilux": {
        brand: "Toyota", 
        year: "2024",
        description: "Picape robusta e versátil para trabalho e aventura"
    },
    "Yaris": {
        brand: "Toyota",
        year: "2024",
        description: "Hatch compacto com excelente consumo de combustível"
    },
    "X5": {
        brand: "BMW",
        year: "2024",
        description: "SUV de luxo com performance e tecnologia avançada"
    },
    "M3": {
        brand: "BMW",
        year: "2024", 
        description: "Sedã esportivo de alta performance da série M"
    },
    "i8": {
        brand: "BMW",
        year: "2024",
        description: "Híbrido esportivo com design futurista e tecnologia"
    },
    "C-Class": {
        brand: "Mercedes-Benz",
        year: "2024",
        description: "Sedã executivo que combina luxo e esportividade"
    },
    "E-Class": {
        brand: "Mercedes-Benz",
        year: "2024",
        description: "Sedã de luxo com tecnologia de ponta e conforto superior"
    },
    "S-Class": {
        brand: "Mercedes-Benz", 
        year: "2024",
        description: "Topo de linha com o que há de mais avançado em luxo automotivo"
    }
};

// Datos de exemplo para peças por modelo con categorías (sem price)
const MODEL_PARTS = {
    "Corolla": [
        {
            id: 1,
            brand: "Toyota",
            image: noimg,
            name: "Filtro de Óleo Corolla 2020",
            category: 'motor',
            disponivel: true
        },
        {
            id: 2,
            brand: "Toyota",
            image: noimg,
            name: "Pastilha de Freio Dianteira",
            category: 'freios',
            disponivel: true
        },
        {
            id: 3,
            brand: "Toyota",
            image: noimg,
            name: "Kit Correia Dentada",
            category: 'motor',
            disponivel: false
        },
        {
            id: 16,
            brand: "Toyota",
            image: noimg,
            name: "Farol Dianteiro Esquerdo",
            category: 'farois',
            disponivel: true
        },
        {
            id: 17,
            brand: "Toyota",
            image: noimg,
            name: "Banco do Motorista",
            category: 'interior',
            disponivel: true
        },
        {
            id: 18,
            brand: "Toyota",
            image: noimg,
            name: "Amortecedor Dianteiro",
            category: 'suspensao',
            disponivel: true
        },
    ],
    "Hilux": [
        {
            id: 4,
            brand: "Toyota",
            image: noimg,
            name: "Amortecedor Hilux 4x4",
            category: 'suspensao',
            disponivel: true
        },
        {
            id: 5,
            brand: "Toyota",
            image: noimg,
            name: "Filtro de Combustível",
            category: 'filtros',
            disponivel: true
        },
        {
            id: 19,
            brand: "Toyota",
            image: noimg,
            name: "Lanterna Traseira",
            category: 'farois',
            disponivel: true
        },
    ],
    "Yaris": [
        {
            id: 6,
            brand: "Toyota",
            image: noimg,
            name: "Velas de Ignição Yaris",
            category: 'motor',
            disponivel: true
        },
        {
            id: 7,
            brand: "Toyota",
            image: noimg,
            name: "Filtro de Ar",
            category: 'motor',
            disponivel: true
        },
        {
            id: 20,
            brand: "Toyota",
            image: noimg,
            name: "Rádio Multimídia",
            category: 'acessorios',
            disponivel: true
        },
    ],
    "X5": [
        {
            id: 8,
            brand: "BMW",
            image: noimg,
            name: "Sensor ABS X5",
            category: 'freios',
            disponivel: true
        },
        {
            id: 9,
            brand: "BMW",
            image: noimg,
            name: "Disco de Freio",
            category: 'freios',
            disponivel: false
        },
        {
            id: 21,
            brand: "BMW",
            image: noimg,
            name: "Xenon Farol Dianteiro",
            category: 'farois',
            disponivel: true
        },
    ],
    "M3": [
        {
            id: 10,
            brand: "BMW",
            image: noimg,
            name: "Embreagem Esportiva M3",
            category: 'motor',
            disponivel: true
        },
        {
            id: 22,
            brand: "BMW",
            image: noimg,
            name: "Volante Esportivo",
            category: 'interior',
            disponivel: true
        },
    ],
    "i8": [
        {
            id: 11,
            brand: "BMW",
            image: noimg,
            name: "Bateria Híbrida i8",
            category: 'eletrica',
            disponivel: false
        },
        {
            id: 23,
            brand: "BMW",
            image: noimg,
            name: "LED de Daytime",
            category: 'farois',
            disponivel: true
        },
    ],
    "C-Class": [
        {
            id: 12,
            brand: "Mercedes",
            image: noimg,
            name: "Radiador C-Class",
            category: 'motor',
            disponivel: true
        },
        {
            id: 13,
            brand: "Mercedes",
            image: noimg,
            name: "Farol Dianteiro",
            category: 'farois',
            disponivel: true
        },
        {
            id: 24,
            brand: "Mercedes",
            image: noimg,
            name: "Tela Central",
            category: 'interior',
            disponivel: true
        },
    ],
    "E-Class": [
        {
            id: 14,
            brand: "Mercedes",
            image: noimg,
            name: "Suspensão Aérea",
            category: 'suspensao',
            disponivel: false
        },
        {
            id: 25,
            brand: "Mercedes",
            image: noimg,
            name: "Bancos de Couro",
            category: 'interior',
            disponivel: true
        },
    ],
    "S-Class": [
        {
            id: 15,
            brand: "Mercedes",
            image: noimg,
            name: "Display Central S-Class",
            category: 'interior',
            disponivel: true
        },
        {
            id: 26,
            brand: "Mercedes",
            image: noimg,
            name: "Motor V8",
            category: 'motor',
            disponivel: false
        },
    ]
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
                <span className={`badge ${part.disponivel ? "bg-success" : "bg-danger"}`}>
                    {part.disponivel ? "Em estoque" : "Sob encomenda"}
                </span>
            </div>
        </div>
        
        <div className="card-body d-flex flex-column text-light">
            <h6 className="card-title fw-bold mb-2">{part.name}</h6>
            <p className="text-secondary small mb-3">{part.brand}</p>
            
            <div className="mt-auto">
                <button
                    className="btn btn-sm w-100"
                    onClick={() => onAdd(part)}
                    disabled={!part.disponivel}
                    style={{
                        background: part.disponivel 
                            ? 'linear-gradient(45deg, #10192b, #1d3557ff, #3a5f9bff)' 
                            : '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '0.5rem 1rem'
                    }}
                >
                    {part.disponivel ? "Adicionar ao Carrinho" : "Consultar disponibilidade"}
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
        <div className="card-body d-flex flex-column justify-content-center align-items-center p-3">
            <div
                className="rounded-circle d-flex align-items-center justify-content-center mb-3"
                style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: isSelected ? 'rgba(255,255,255,0.1)' : category.color + '20',
                    color: isSelected ? 'white' : category.color,
                    transition: 'all 0.3s ease'
                }}
            >
                {category.icon}
            </div>
            <h6 className="fw-semibold mb-2 text-light" style={{ fontSize: '0.85rem' }}>
                {category.name}
            </h6>
            <span 
                className={`badge ${count < 1 ? 'bg-danger' : isSelected ? 'bg-light text-dark' : 'bg-light text-dark'}`}
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

    const handleSearch = useCallback((value) => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => setQuery(value), 220);
    }, []);

    const parts = useMemo(() => {
        const modelParts = MODEL_PARTS[modelName] || [];

        let filteredParts = modelParts;

        // Filtrar por categoría
        if (selectedCategory !== 'all') {
            filteredParts = filteredParts.filter(part => part.category === selectedCategory);
        }

        // Filtrar por búsqueda
        if (query) {
            const normalizedQuery = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            filteredParts = filteredParts.filter(part =>
                part.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(normalizedQuery) ||
                part.brand.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(normalizedQuery)
            );
        }

        return filteredParts;
    }, [modelName, query, selectedCategory]);

    const adicionarCarrinho = (produto) => {
        if (produto.disponivel) {
            setCarrinho((prev) => [...prev, produto]);
            setShowCart(true);
        }
    };

    const removerProduto = (id) => {
        setCarrinho((prev) => prev.filter((p) => p.id !== id));
    };

    const enviarPedido = () => {
        if (carrinho.length === 0) return;

        const lista = carrinho.map((item, index) => 
            `${index + 1}. ${item.name} - ${item.brand}`
        ).join('\n');

        window.location.href = `mailto:autopecas@empresa.com?subject=Pedido para ${modelName}&body=Olá, gostaria de fazer o pedido para ${modelName}:\n\n${lista}\n\nTotal de itens: ${carrinho.length}`;
    };

    const getCategoryCount = (categoryId) => {
        const modelParts = MODEL_PARTS[modelName] || [];
        if (categoryId === 'all') return modelParts.length;
        return modelParts.filter(part => part.category === categoryId).length;
    };

    const modelInfo = MODEL_INFO[modelName] || {
        brand: modelName,
        year: "2024",
        description: `Modelo ${modelName} - Peças originais e compatíveis`
    };

    const carImage = CAR_MODEL_IMAGES[modelName] || "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&h=400&fit=crop";

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
                                {modelInfo.description}
                            </p>
                            <div className="row text-center">
                                <div className="col-4">
                                    <div className="text-primary fw-bold fs-3">
                                        {MODEL_PARTS[modelName]?.length || 0}
                                    </div>
                                    <div className="text-light small">Peças Disponíveis</div>
                                </div>
                                <div className="col-4">
                                    <div className="text-primary fw-bold fs-3">
                                        {MODEL_PARTS[modelName]?.filter(p => p.disponivel).length || 0}
                                    </div>
                                    <div className="text-light small">Em Estoque</div>
                                </div>
                                <div className="col-4">
                                    <div className="text-primary fw-bold fs-3">
                                        {CATEGORIES.filter(cat => getCategoryCount(cat.id) > 0).length}
                                    </div>
                                    <div className="text-light small">Categorias</div>
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
                                        border: '2px solid rgba(255, 255, 255, 0)',
                                        backdropFilter: 'blur(10px)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <img 
                                        src={carImage}
                                        alt={modelName}
                                        className="rounded-circle img-fluid"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                        onError={(e) => {
                                            e.target.src = 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&h=400&fit=crop';
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Busca e Filtros */}
            <section className="container-fluid h-100 position-relative py-5">
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

                {/* Categorías */}
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
                                    onClick={() => {setSelectedCategory(category.id); scrollTo(0,
                                        parseFloat(document.body.scrollHeight - document.body.scrollHeight * 70/100),)}}
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


            {/* Botón flotante del carrito */}
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
                                    {carrinho.map((item) => (
                                        <div key={item.id} className="card mb-2 border-0" style={{
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