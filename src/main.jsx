import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { installViewportZoomResetOnOrientation } from './lib/viewportZoomReset'
import './index.css'

installViewportZoomResetOnOrientation()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
