import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AdminPanel from './pages/admin/Dashboard'
import HomeAutoPecas from './pages/HomeAutoPecas'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeAutoPecas />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  )
}

export default App