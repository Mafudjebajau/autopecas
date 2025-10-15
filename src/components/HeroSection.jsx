import React from "react";
import { FaCheck, FaStar} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import heroCarWebP from "../assets/teste.png";


export const Hero = React.memo(() => {

    const navigate = useNavigate()

    return (
        <section className="hero-premium pt-5" style={{
            background: "linear-gradient(45deg, #10192b, #1d3557ff, #3a5f9bff)",
            color: "white",
            display: "flex",
            alignItems: "center",
            position: "relative",
            overflow: "hidden"
        }}>
            {/* Background Elements */}
            <div className="position-absolute w-100 h-100" style={{
                background: 'url("/src/assets/logo.svg") left no-repeat',
                opacity: '.1'
            }}></div>

            <div className="container-fluid px-3 px-md-5 position-relative">
                <div className="row align-items-center py-5">
                    <div className="col-12 col-lg-6 text-center text-lg-start">
                        <div className="mb-4">
                            <span className="badge bg-primary text-white px-4 py-2 rounded-pill fw-semibold mb-3">
                                <FaStar className="text-warning" size={25} /> Peças 100% Originais
                            </span>
                        </div>
                        <h1 className="fw-bold display-3 mb-4 lh-sm">
                            Excelência em
                            <span className="text-primary"> Peças Automotivas</span>
                        </h1>
                        <p className="lead mb-4 fs-5 text-light">
                            Descubra a diferença da qualidade premium. Peças genuínas,
                            atendimento especializado e entrega ágil para manter seu veículo em perfeito estado.
                        </p>
                        <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
                            <a href="" className="btn btn-danger btn-lg fw-semibold px-5 py-3 rounded-pill" onClick={(e) => {
                                e.preventDefault()
                                navigate("/marcas")

                            }}>
                                Explorar Marcas
                            </a>
                            <a href="#services" className="btn btn-outline-light btn-lg px-5 py-3 rounded-pill">
                                Nossos Serviços
                            </a>
                        </div>

                        {/* Trust Indicators */}
                        <div className="d-flex flex-wrap gap-4 mt-5 pt-3">
                            <div className="d-flex align-items-center">
                                <FaCheck className="text-success me-2" />
                                <small className="text-light">Serviços de Excelência</small>
                            </div>
                            <div className="d-flex align-items-center">
                                <FaCheck className="text-success me-2" />
                                <small className="text-light">Peças 100% originais</small>
                            </div>
                            <div className="d-flex align-items-center">
                                <FaCheck className="text-success me-2" />
                                <small className="text-light">Entregas ao domicílio</small>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-lg-6 text-center mt-5 mt-lg-0">
                        <div className="position-relative">
                            <div className="hero-image-container">
                                <img
                                    src={heroCarWebP}
                                    alt="Carro premium e peças automotivas de alta qualidade"
                                    className="img-fluid"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
});