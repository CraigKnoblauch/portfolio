import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style.css'
import { createTheme, MantineProvider } from '@mantine/core'
import Rabbit from './components/Rabbit.jsx'
import { RabbitAnimationsProvider } from './contexts/RabbitAnimationsContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider>
      <RabbitAnimationsProvider>
        <App />
      </RabbitAnimationsProvider>
    </MantineProvider>
  </React.StrictMode>,
)
