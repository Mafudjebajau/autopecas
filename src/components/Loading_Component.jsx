
export default function Loader() {
    return (
        <>
            <div className="min-vh-100 bg-dark d-flex w-100 justify-content-center align-items-center">
                <div className="container py-5 ">
                    <div className="text-center py-5 gap-2">

                        <div class="spinner-grow text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <div class="spinner-grow text-danger p-3" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <div class="spinner-grow text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3 text-light">Carregando marcas...</p>
                    </div>
                </div>
            </div>
        </>
    )
}