import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './style.css'
import { createTheme, MantineProvider } from '@mantine/core'
import { RabbitAnimationsProvider } from './contexts/RabbitAnimationsContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RabbitAnimationsProvider>
        <App />
      </RabbitAnimationsProvider>
  </React.StrictMode>,
)
