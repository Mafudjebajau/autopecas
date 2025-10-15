import React, { useRef, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCalendar, FaPhone, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { Header } from "../components/Header";

// Informações detalhadas dos serviços
const SERVICE_DETAILS = {
  "Troca de Óleo": {
    description: "Troca completa de óleo do motor com filtro incluído",
    duration: "30-45 min",
    price: "A partir de R$ 149,90",
    benefits: ["Óleo sintético premium", "Filtro original", "Verificação de nível", "Garantia de 90 dias"]
  },
  "Alinhamento": {
    description: "Alinhamento 3D computadorizado com laudo técnico",
    duration: "40-60 min",
    price: "A partir de R$ 89,90",
    benefits: ["Tecnologia 3D", "Laudo impresso", "Ajuste de câmber", "Garantia de 30 dias"]
  },
  "Balanceamento": {
    description: "Balanceamento de rodas com equipamento digital",
    duration: "30-45 min",
    price: "A partir de R$ 59,90",
    benefits: ["Equipamento digital", "Contrapesos novos", "Teste de estrada", "Garantia de 30 dias"]
  },
  "Revisão Periódica": {
    description: "Revisão completa conforme manual do fabricante",
    duration: "2-3 horas",
    price: "Sob consulta",
    benefits: ["Peças originais", "Diagnóstico computadorizado", "Relatório detalhado", "Garantia de 120 dias"]
  },
  "Freios": {
    description: "Reparo e substituição do sistema de freios",
    duration: "1-2 horas",
    price: "A partir de R$ 199,90",
    benefits: ["Pastilhas originais", "Discos retificados", "Teste de frenagem", "Garantia de 60 dias"]
  },
  "Suspensão": {
    description: "Reparo completo do sistema de suspensão",
    duration: "2-3 horas",
    price: "Sob consulta",
    benefits: ["Amortecedores premium", "Buchas originais", "Geometria corrigida", "Garantia de 90 dias"]
  },
  "Motor": {
    description: "Reparos e manutenção do motor",
    duration: "4-6 horas",
    price: "Sob consulta",
    benefits: ["Peças originais", "Mão de obra especializada", "Teste de compressão", "Garantia de 180 dias"]
  },
  "Transmissão": {
    description: "Reparos em transmissão manual ou automática",
    duration: "3-5 horas",
    price: "Sob consulta",
    benefits: ["Óleo específico", "Componentes originais", "Teste de troca", "Garantia de 120 dias"]
  }
};

export default function ServicePage() {
  const { serviceName } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [query, setQuery] = useState("");
  const debounceRef = useRef(null);

  const handleSearch = useCallback((value) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setQuery(value), 220);
  }, []);

  const service = SERVICE_DETAILS[serviceName] || {
    description: "Serviço de qualidade para seu veículo",
    duration: "A combinar",
    price: "Sob consulta",
    benefits: ["Profissionais qualificados", "Peças de qualidade", "Garantia", "Atendimento personalizado"]
  };

  const agendarServico = () => {
    const mensagem = `Olá, gostaria de agendar ${serviceName} para ${selectedDate} às ${selectedTime}`;
    window.open(`https://wa.me/551140000000?text=${encodeURIComponent(mensagem)}`, '_blank');
  };

  const ligarParaOficina = () => {
    window.location.href = 'tel:+551140000000';
  };

  const enviarEmail = () => {
    window.location.href = `mailto:oficina@empresa.com?subject=Orçamento para ${serviceName}&body=Gostaria de um orçamento para ${serviceName}`;
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Header completo */}
      <Header onSearch={handleSearch} />

      <main className="container py-4" style={{ marginTop: '80px' }}>

        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <h1 className="display-6 fw-bold text-primary mb-3">{serviceName}</h1>
                <p className="lead text-muted mb-4">{service.description}</p>

                <div className="row mb-4">
                  <div className="col-md-6">
                    <div className="d-flex align-items-center mb-3">
                      <FaCalendar className="text-primary me-3" size={20} />
                      <div>
                        <strong className="d-block">Duração</strong>
                        <span className="text-muted">{service.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-primary rounded p-2 me-3">
                        <span className="text-white fw-bold">R$</span>
                      </div>
                      <div>
                        <strong className="d-block">Investimento</strong>
                        <span className="text-muted">{service.price}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h5 className="fw-bold mb-3">Benefícios Incluídos</h5>
                  <div className="row">
                    {service.benefits.map((benefit, index) => (
                      <div key={index} className="col-md-6 mb-2">
                        <div className="d-flex align-items-center">
                          <div className="bg-success rounded-circle p-1 me-2">
                            <span className="text-white" style={{ fontSize: '12px' }}>✓</span>
                          </div>
                          <span>{benefit}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-top pt-4">
                  <h5 className="fw-bold mb-3">Agendar Serviço</h5>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Data preferida</label>
                      <input
                        type="date"
                        className="form-control"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Horário preferido</label>
                      <select
                        className="form-select"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                      >
                        <option value="">Selecionar horário</option>
                        <option value="08:00">08:00</option>
                        <option value="09:00">09:00</option>
                        <option value="10:00">10:00</option>
                        <option value="11:00">11:00</option>
                        <option value="14:00">14:00</option>
                        <option value="15:00">15:00</option>
                        <option value="16:00">16:00</option>
                      </select>
                    </div>
                  </div>

                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                      className="btn btn-outline-primary me-md-2"
                      onClick={ligarParaOficina}
                    >
                      <FaPhone className="me-2" />
                      Ligar Agora
                    </button>
                    <button
                      className="btn btn-success me-md-2"
                      onClick={agendarServico}
                      disabled={!selectedDate || !selectedTime}
                    >
                      <FaWhatsapp className="me-2" />
                      Agendar via WhatsApp
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={enviarEmail}
                    >
                      <FaEnvelope className="me-2" />
                      Solicitar Orçamento
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}