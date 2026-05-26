import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId:   'com.anniversary.chronicles',
  appName: 'The Chronicles of Us',
  webDir:  'dist',

  server: {
    /* Use https scheme on Android so cookies / storage work the
       same as a real HTTPS origin. */
    androidScheme: 'https',
  },

  plugins: {
    StatusBar: {
      /* Dark icons / text — suitable for the light pink background. */
      style:           'DARK',
      backgroundColor: '#fff0f5',
      /* Let the web view extend under the status bar on Android. */
      overlaysWebView: true,
    },
    SplashScreen: {
      /* Dismiss immediately; we have a nice cover section. */
      launchShowDuration:   0,
      backgroundColor:      '#fff0f5',
      showSpinner:          false,
    },
  },
}

export default config
