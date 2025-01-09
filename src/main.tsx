// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import axios from 'axios'

// config
axios.defaults.timeoutErrorMessage = "Request timed out"
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (!error.response) {
      error.response = { data: { message: error.message } }
    }
    if (!error.response.data) {
      error.response.data = { message: error.message }
    }
    return Promise.reject(error);
  }
);

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  // </StrictMode>,
)
