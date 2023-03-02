import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App/App'
import Header from './components/template/Header/Header'
import Footer from './components/template/Footer/Footer'


const header = ReactDOM.createRoot(document.getElementById('nav'))
header.render(
  <React.StrictMode>
    <Header/>
  </React.StrictMode>
)

const AuthSection = ReactDOM.createRoot(document.getElementById('App'));
AuthSection.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
)

const footer = ReactDOM.createRoot(document.getElementById('footer'))
footer.render(
  <React.StrictMode>
    <Footer/>
  </React.StrictMode>
)