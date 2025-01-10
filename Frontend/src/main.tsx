import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Toaster from './components/Global/Toaster/Toaster.tsx'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
