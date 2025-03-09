import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { StyleProvider, ThemeProvider } from 'antd-style';
import { ConfigProvider } from 'antd';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ConfigProvider
          theme={{
              token: {
                  // You can customize the theme here
                  colorPrimary: '#1677ff',
              },
          }}
      >
          <StyleProvider prefix="your-app">
              <ThemeProvider>
                  <App />
              </ThemeProvider>
          </StyleProvider>
      </ConfigProvider>
  </StrictMode>,
)
