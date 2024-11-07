import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
<<<<<<< Updated upstream
import Home from './components/Home'
import popup from './components/popup'
=======
import Home from './views/Home'
>>>>>>> Stashed changes

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Home />
      <popup />

    </>
  )
}

export default App
