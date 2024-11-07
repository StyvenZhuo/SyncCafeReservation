import './App.css'
import Popup from './views/popup'
import Home from './views/Home'
import Reservasi from './views/Reservasi'
import { Routes, Route } from 'react-router-dom';


function App() {

  return (
    <>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/reservasi" element={<Reservasi />} />
        <Route path="/popup" element={<Popup />} />
      </Routes>

    </>
  )
}

export default App
