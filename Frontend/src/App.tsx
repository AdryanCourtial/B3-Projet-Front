import './App.css'
import { BrowserRouter, Routes, Route } from "react-router"
import Home from './components/Home/Home'
import Public from './components/Public/Public'
import Private from './components/Private/Private'
import Game from './components/Game/Game'
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout'
import NoLayout from './layouts/NoLayout/NoLayout'
import CreateLobby from './components/CreateLobby/CreateLobby'
import Lobby from './components/Lobby/Lobby'

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
      <Route path="/qibble/createLobby"
      element={
        <NoLayout>
          <CreateLobby />
        </NoLayout>
      } />
      <Route path="/qibble/lobby" element={
        <NoLayout>
          <Lobby />
        </NoLayout>
        } />
      <Route path="/qibble/game"
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
