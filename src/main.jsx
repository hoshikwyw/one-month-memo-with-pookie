import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, useTheme } from '@kwyw/kayv-glass-ui'
import { Capacitor } from '@capacitor/core'
import { StatusBar, Style } from '@capacitor/status-bar'
import { SplashScreen } from '@capacitor/splash-screen'
import './index.css'
import App from './App.jsx'

/* ── Native platform bootstrap ────────────────────────────── */
if (Capacitor.isNativePlatform()) {
  /* Dark icons / text suits the light-pink background. */
  StatusBar.setStyle({ style: Style.Dark }).catch(() => {})

  /* Android: transparent status bar so the web view extends under it. */
  if (Capacitor.getPlatform() === 'android') {
    StatusBar.setBackgroundColor({ color: '#00000000' }).catch(() => {})
    StatusBar.setOverlaysWebView({ overlay: true }).catch(() => {})
  }

  /* Hide splash screen after React has mounted. */
  SplashScreen.hide({ fadeOutDuration: 300 }).catch(() => {})
}

/* ── Theme wrapper — sets glass-rose palette on mount ─────── */
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
