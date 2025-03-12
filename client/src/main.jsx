import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { RouterComponents } from './Routers/Routes.jsx'
import { Components } from './Components/Components.jsx'
import { App } from './App.jsx'
import './assets/css/index.min.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App Route={RouterComponents} Components={Components}/>
    </BrowserRouter>
  </StrictMode>,
)
