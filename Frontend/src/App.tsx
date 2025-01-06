import './App.css'
import { BrowserRouter, Routes, Route } from "react-router"
import Home from './components/Home/Home'
import Public from './components/Public/Public'
import Private from './components/Private/Private'
import Lobby from './components/Lobby/Lobby'
import Game from './components/Game/Game'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/qibble/public" element={<Public />} />
      <Route path="/qibble/private" element={<Private />} />
      <Route path="/qibble/lobby" element={<Lobby />} />
      <Route path="/qibble/game/:uuid" element={<Game />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
