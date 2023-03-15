import React from "react"
import "./Display.css"
import axios from "axios"
import Agendamento from "./Agendamento/Agendamento"
import TabelaAgendamentos from "./TabelaAgendamentos/TabelaAgendamentos"

export default function Display(props) {


    async function handleTabela(e) {

        const formData = new FormData()
        formData.append('codigo_agendamento', e.codigo_agendamento.value)
        formData.append('data_agendamento', e.data_agendamento.value)

        const data = {
            codigo_agendamento: e.codigo_agendamento.value,
            data_agendamento: e.data_agendamento.value
        }

        try{
            const res = await axios.get(`http://localhost:5000/api/v1/agendamentos`, {
                params: data,
                headers: { 'Content-Type': 'application/json' } 
            })
            if(res.status === 200)
                props.setAgendamentos([...res.data])
        } catch(e){
            alert(e.response.data.mensagem)
        }
    }

    return (
        <div id="main">
            <Agendamento handleTabela={handleTabela}/>
            <TabelaAgendamentos agendamentos={props.agendamentos}/>
        </div>
    )
}