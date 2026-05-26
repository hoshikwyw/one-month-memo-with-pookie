import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, useTheme } from '@kwyw/kayv-glass-ui'
import './index.css'
import App from './App.jsx'

function RoseTheme({ children }) {
  const { setTheme } = useTheme()
  useEffect(() => { setTheme('glass-rose') }, [setTheme])
  return children
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <RoseTheme>
        <App />
      </RoseTheme>
    </ThemeProvider>
  </StrictMode>,
)
