import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import HomeAutoPecas from './pages/HomeAutoPecas';
import ModelPage from './pages/ModelPage';
import ServicePage from './pages/ServicePage';
import CarModelPage from './pages/CarModelPage';
import BrandsPage from './pages/BrandPage';
import AboutPage from './pages/AboutPage';
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
      </Routes>
    </Router>
  );
}

export default App;