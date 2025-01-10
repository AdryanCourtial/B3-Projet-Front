import './App.css'
import { BrowserRouter, Routes, Route } from "react-router"
import Home from './components/Home/Home'
import Public from './components/Public/Public'
import Private from './components/Private/Private'
import Lobby from './components/Lobby/Lobby'
import Game from './components/Game/Game'
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout'
import NoLayout from './layouts/NoLayout/NoLayout'
import Toaster from './components/Global/Toaster/Toaster'

function App() {

  return (
        <BrowserRouter>
        <Routes>

          <Route path="/" 
          element={
            <DefaultLayout>
              <Home />
            </DefaultLayout>
          } />

          <Route path="/qibble/public" 
          element={
            <NoLayout>
              <Public />
            </NoLayout>
            } />

      <Route path="/qibble/private"
      element={
        <NoLayout>
          <Private />
        </NoLayout>
      } />
      <Route path="/qibble/lobby" element={
        <DefaultLayout>
          <Lobby />
        </DefaultLayout>
        } />
      <Route path="/qibble/game/:uuid"
      element={
        <NoLayout>
          <Game />
        </NoLayout>
      } />
      
    </Routes>
  </BrowserRouter>
  )
}

export default App
