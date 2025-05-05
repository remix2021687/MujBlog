import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { Provider } from 'react-redux'
import { RouterComponents } from './Routers/Routes.jsx'
import { Components } from './Components/Components.jsx'
import { App } from './App.jsx'
import store from './redux/store.js'
import './assets/css/index.min.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App Route={RouterComponents} Components={Components}/>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
