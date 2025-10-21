import { useNavigate } from "react-router-dom"

const NotFoundPage = () => {
    const navigate = useNavigate()
    return (

        <>
            <h1>404 recurso nao encontrado!</h1>
            <button className="btn btn-outline-light" onClick={()=>navigate("/")}>Voltar para pagina inicial</button>
        </>
    )
}

export default NotFoundPage;