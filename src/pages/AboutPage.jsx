import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { 
    FaAward, 
    FaUsers, 
    FaShieldAlt, 
    FaRocket, 
    FaMapMarkerAlt, 
    FaPhone, 
    FaEnvelope,
    FaClock,
    FaCar,
    FaHandshake,
    FaChartLine,
    FaInfoCircle
} from "react-icons/fa";

export default function AboutPage() {
   

    const values = [
        {
            icon: <FaShieldAlt size={40} />,
            title: "Qualidade Garantida",
            description: "lorem ipsum ."
        },
        {
            icon: <FaRocket size={40} />,
            title: "Inovação Constante",
            description: "lorem"
        },
        {
            icon: <FaUsers size={40} />,
            title: "Foco no Cliente",
            description: "lorem ipsum"
        },
        {
            icon: <FaHandshake size={40} />,
            title: "Parcerias Sólidas",
            description: "lorem ipsum"
        }
    ];


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
                            <div className="icon-header mb-4">
                                <div className="icon-wrapper">
                                    <FaAward className="text-primary" size={32} />
                                </div>
                            </div>
                            <h1 className="display-4 fw-bold mb-3">
                                Sobre <span className="text-primary">Nós</span>
                            </h1>
                            <p className="lead mb-4 fs-5">
                               Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi ducimus rem molestias sint quam deserunt maxime in labore dolor voluptatem eveniet sed, earum ullam quis atque itaque fugiat soluta obcaecati!
                            </p>
                            <div className="row text-center">
                                <div className="col-4">
                                    <div className="text-primary fw-bold fs-3">15+</div>
                                    <div className="text-light small">Anos de Experiência</div>
                                </div>
                                <div className="col-4">
                                    <div className="text-primary fw-bold fs-3">50+</div>
                                    <div className="text-light small">Marcas Parceiras</div>
                                </div>
                                <div className="col-4">
                                    <div className="text-primary fw-bold fs-3">10K+</div>
                                    <div className="text-light small">Peças Entregues</div>
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
                                        justifyContent: 'center'
                                    }}
                                >
                                    <FaInfoCircle  size={64} className="text-info" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Nossa História */}
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

                <div className="container position-relative text-light">
                    <div className="row">
                        <div className="col-lg-6">
                            <h2 className="h1 fw-bold mb-4">Nossa <span className="text-primary">História</span></h2>
                            <p className="lead mb-4">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil, aspernatur illo ratione harum voluptas cumque quos neque corporis molestiae magni temporibus laudantium quia vero esse non cum fugiat consectetur perferendis.
                            </p>
                            <p className="mb-4">
                               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique molestias, nobis esse suscipit impedit id consequatur illum atque deleniti quibusdam quos, cum fugiat, libero rerum numquam natus maxime tenetur quidem.
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam porro facilis placeat? Explicabo totam vel rem voluptate. At ullam sapiente repellendus laboriosam aut, illum ab officia aperiam minima maiores iusto?
                            </p>
                        </div>
                        <div className="col-lg-6">
                            <div className="card border-0" style={{
                                background: '#2f3c4e3e',
                                backdropFilter: 'blur(10px)',
                                boxShadow: '2px 5px 5px #26252f'
                            }}>
                                <div className="card-body p-4 text-secondary">
                                    <h4 className="text-primary mb-4">Nossa Missão</h4>
                                    <p className="mb-4 ">
                                       Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero alias facilis, odit atque non fugiat deserunt maxime repellendus facere soluta reiciendis esse est, aliquid voluptate laboriosam quae! Soluta, quidem ex!
                                    </p>
                                    <h4 className="text-primary mb-4">Nossa Visão</h4>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate culpa minus veniam soluta odit iste, reprehenderit ducimus hic obcaecati saepe quia incidunt nisi harum iure veritatis corporis eaque aut quaerat!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Nossos Valores */}
            <section className="py-5 position-relative" style={{
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
            }}>
                <div className="container position-relative text-light">
                    <div className="text-center mb-5">
                        <h2 className="h1 fw-bold mb-3">Nossos <span className="text-primary">Valores</span></h2>
                        <p className="lead">Princípios que guiam cada decisão e ação em nossa empresa</p>
                    </div>
                    <div className="row g-4">
                        {values.map((value, index) => (
                            <div key={index} className="col-lg-6">
                                <div className="card h-100 border-0" style={{
                                    background: '#2f3c4e3e',
                                    backdropFilter: 'blur(10px)',
                                    boxShadow: '2px 5px 5px #26252f'
                                }}>
                                    <div className="card-body p-4 text-center">
                                        <div className="text-primary mb-3">
                                            {value.icon}
                                        </div>
                                        <h5 className="text-light mb-3">{value.title}</h5>
                                        <p className="text-light mb-0">{value.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />

            <style jsx>{`
                .icon-header {
                    width: 80px;
                    height: 80px;
                }

                .icon-wrapper {
                    width: 100%;
                    height: 100%;
                    background: rgba(59, 130, 246, 0.1);
                    border: 2px solid rgba(59, 130, 246, 0.3);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .card {
                    transition: all 0.3s ease;
                }

                .card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3) !important;
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