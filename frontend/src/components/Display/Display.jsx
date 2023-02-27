import React, { useState } from "react"
import "./Display.css"
import Agendamento from "../Agendamento/Agendamento"
import TabelaAgendamentos from "../TabelaAgendamentos/TabelaAgendamentos"
import axios from "axios"

export default function Display(props) {

    const [agendamentos, setAgendamentos] = useState([])

    function handleTabela(ID) {
        console.log(ID)

        fetch('http:/localhost:5008/agendamento', {
            method: 'GET'
        }).then(agendamentos => setAgendamentos([...agendamentos]))
    }

    return (
        <div id="main">
            <Agendamento handleTabela={handleTabela}/>
            <TabelaAgendamentos agendamentos={agendamentos}/>
        </div>
    )
}