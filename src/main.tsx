import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Store from './redux/Store.ts'
import { Provider } from 'react-redux'
// import { AlertProvider } from './context/AlertContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={Store}>
      {/* <AlertProvider> */}
        <App />
      {/* </AlertProvider> */}
    </Provider>
  </StrictMode>,
)
