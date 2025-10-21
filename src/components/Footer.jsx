import { FaAward, FaPhone, FaCheck, FaStar, FaMapMarkerAlt, FaEnvelope, FaWhatsapp } from "react-icons/fa"
import { CiAt } from "react-icons/ci";
export const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-12 col-md-6 col-lg-4">
            <h5 className="fw-bold mb-3"> <b className="text-primary">ebTrading</b> Peças Auto & Oficina</h5>
            <div id="map" style={{ height: "180px", width: "100%" }}>

              <iframe
                className="pb-4"
                title="mapa"
                src="https://www.google.com/maps/embed?pb=!1m21!1m12!1m3!1d1462.588296941819!2d-15.582097884376276!3d11.86028907373172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m6!3e6!4m0!4m3!3m2!1d11.85912490960589!2d-15.582535930572146!5e0!3m2!1spt-PT!2ses!4v1761002245256!5m2!1spt-PT!2ses"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy" referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
          
            </div>
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
                Mercado Central (1º piso)
              </p>
              <p className="mb-2">
                <FaWhatsapp className="text-success me-2" />
                +245 96 639 78 95
              </p>
              <p className="mb-0">
                <CiAt className="text-light me-2" />
                ebtrading24h@gmail.com
              </p>
            </div>
          </div>

          <div className="col-12 col-md-12 col-lg-4">
            <h6 className="fw-bold mb-3">Horário Comercial</h6>
            <div className="text-light">
              <p className="mb-1">Segunda a Sábado: 8:30 às 17:30</p>
              <p className="mb-0">Domingos e Feriados: <b className="text-danger">Fechado</b></p>
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