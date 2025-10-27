import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "./assets/styles/App.css"
import ErrorBoundary from './common/ErrorBoundary.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
    <App />
    </ErrorBoundary>
  </StrictMode>,
)
