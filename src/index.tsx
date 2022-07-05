import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import store from './store'
import { Provider } from 'react-redux'
import { createGlobalStyle } from 'styled-components'

const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', 'Roboto', 'Noto Sans', 'Ubuntu', 'Droid Sans', 'Helvetica Neue', sans-serif;
    color: #172b4d;
    list-style: none;
  }
`

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Global />
      <App />
    </Provider>
  </React.StrictMode>,
)
