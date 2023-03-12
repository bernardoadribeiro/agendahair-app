import React, { useState } from "react"
import "./App.css"
import Login from '../components/Login/Login'
import Display from "../components/Display/Display"
import Header from "../components/template/Header/Header"
import Footer from "../components/template/Footer/Footer"

function App() {

    const [display, setDisplay] = useState(false)
    const [agendamentos, setAgendamentos] = useState([])
    
    return (
        
        <div>
            <Header setAgendamentos={setAgendamentos} setDisplay={setDisplay} display={display}/>
            {display ? <Display agendamentos = {agendamentos} setAgendamentos={setAgendamentos} /> : <Login setDisplay={setDisplay} />}
            <Footer/>
        </div>
        
        )


}

export default App