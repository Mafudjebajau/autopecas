import { FaAward, FaPhone, FaCheck, FaStar, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa"
export const Footer = ()=>{
    return(
         <footer className="bg-dark text-light py-5">
                <div className="container">
                  <div className="row g-4">
                    <div className="col-12 col-md-6 col-lg-4">
                      <h5 className="fw-bold mb-3">AutoPeças <b className="text-primary">e-trading</b></h5>
                      <p className="text-light mb-4">
                        Excelência em peças automotivas há mais de 15 anos.
                        Qualidade premium e atendimento especializado.
                      </p>
                      <div className="d-flex gap-3">
                        <div className="bg-primary bg-opacity-10 rounded-3 p-2">
                          <FaAward className="text-primary" size={20} />
                        </div>
                        <div className="bg-success bg-opacity-10 rounded-3 p-2">
                          <FaCheck className="text-success" size={20} />
                        </div>
                        <div className="bg-warning bg-opacity-10 rounded-3 p-2">
                          <FaStar className="text-warning" size={20} />
                        </div>
                      </div>
                    </div>
        
                    <div className="col-12 col-md-6 col-lg-4">
                      <h6 className="fw-bold mb-3">Informações</h6>
                      <div className="text-light">
                        <p className="mb-2">
                          <FaMapMarkerAlt className="text-danger me-2" />
                          Av. Pansau na isna
                        </p>
                        <p className="mb-2">
                          <FaPhone className="text-success me-2" />
                          +245 95 000 00 00 / +245 96 000 00 00
                        </p>
                        <p className="mb-0">
                          <FaEnvelope className="text-secondary me-2" />
                          autopecasetrading@gmail.com
                        </p>
                      </div>
                    </div>
        
                    <div className="col-12 col-md-12 col-lg-4">
                      <h6 className="fw-bold mb-3">Horário Comercial</h6>
                      <div className="text-light">
                        <p className="mb-1">Segunda a Sexta: 8h às 18h</p>
                        <p className="mb-1">Sábado: 8h às 12h</p>
                        <p className="mb-0">Domingo: Fechado</p>
                      </div>
                    </div>
                  </div>
        
                  <div className="text-center text-light mt-5 pt-4 border-top border-secondary">
                    <small>
                      © {new Date().getFullYear()} AutoPeças e-trading. Todos os direitos reservados.
                    </small>
                  </div>
                </div>
              </footer>
    )
}