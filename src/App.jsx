import './App.css'
import Popup from './views/popup'
import Reservasi from './components/Reservasi'
import Admin from './admin/admin'
import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import ReservasiPage from './views/ReservasiPage';



function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservasi" element={<ReservasiPage />} />
        <Route path="/popup" element={<Popup />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>

    </>
  )
}

export default App
