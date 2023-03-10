import React, { useState } from "react"
import "./Display.css"
import axios from "axios"
import Agendamento from "./Agendamento/Agendamento"
import TabelaAgendamentos from "./TabelaAgendamentos/TabelaAgendamentos"

export default function Display(props) {

    const [agendamentos, setAgendamentos] = useState([])

    async function handleTabela(e) {

        const formData = new FormData()
        formData.append('codigo_agendamento', e.codigo_agendamento.value)

        const res = await axios.get('http://localhost:5000/api/v1/agendamentos', formData)
        console.log(res)
        if(res.status === 200)
            setAgendamentos([...res.data])
        else
            console.log('Ocorreu um erro')
        console.log(agendamentos)
    }

    return (
        <div id="main">
            <Agendamento handleTabela={handleTabela}/>
            <TabelaAgendamentos agendamentos={agendamentos}/>
        </div>
    )
}