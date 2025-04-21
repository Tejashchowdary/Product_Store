import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "@/components/ui/provider"
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';




createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
