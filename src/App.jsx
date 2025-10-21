import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import HomeAutoPecas from './pages/HomeAutoPecas';
import ModelPage from './pages/ModelPage';
import ServicePage from './pages/ServicePage';
import CarModelPage from './pages/CarModelPage';
import BrandsPage from './pages/BrandPage';
import AboutPage from './pages/AboutPage';
import DeliveryPage from './pages/DeliveryPage';
import NotFoundPage from './pages/NotFoundPage';
import ArtigosPage from './pages/ArtigosPage'
// import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeAutoPecas />} />
        <Route path='/marcas' element={<BrandsPage/>} />
        <Route path='/marcas/:brandName' element={<CarModelPage/>}/>
        <Route path="/modelo/:modelName" element={<ModelPage />} />
        <Route path="/servico/:serviceName" element={<ServicePage />} />
        <Route path='/sobre' element={<AboutPage/>} />
        <Route path='/delivery' element={<DeliveryPage/>} />
        <Route path='/artigos' element={<ArtigosPage/>} />
        <Route path='*' element={<NotFoundPage/>} />
      </Routes>
    </Router>
  );
}

export default App;