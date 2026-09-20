import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'

const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

const root = document.getElementById('root')
if (!root) throw new Error('root element missing')

if (document.documentElement.hasAttribute('data-prerendered')) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
