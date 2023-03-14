import React from "react"
import axios from "axios"
import './Agendamento.css'


function Agendamento (props) {

    function handleBusca(e) {
        e.preventDefault()
        props.handleTabela(e.target.elements)
    }

    async function handleSubmit(e) {
        e.preventDefault()

        const form_data = new FormData()

        Array.from(e.target).forEach(elm => {
            form_data.append(`${elm.name}`, elm.value)
            elm.value = ''
        })

        try {
            await axios.post(`http://localhost:5000/api/v1/agendamentos`, form_data,{
                headers: {'Content-Type': 'multipart/form-data'}
            }).then(res => console.log(res))
        } catch(e) {console.log(e)}
    }


    return (
        <div id="Agendamento">

            <h1>Fazer consulta</h1>
            
            <form onSubmit={handleBusca}>
                <label htmlFor="codigo_agendamento">Código do Agendamento</label>
                <input type="text" placeholder="Digite o código do agendamento" name="codigo_agendamento"/>

                <label htmlFor="data_agendamento">Data do Agendamento</label>
                <input type="date" placeholder="Data do agendamento" name="data_agendamento" />

                <button type="submit">Buscar</button>
            </form>

            <h1>Novo Agendamento</h1>

            <form onSubmit={handleSubmit} id="agendamento">

                <input type="text" placeholder="Nome completo" name="nome_cliente" />
                <input type="date" placeholder="Data" name="data_agendamento" />
                <input type='text' placeholder="Status" name="status" />
                <input type="time" placeholder="Horário início" name="horario_inicio" />
                <input type='time' placeholder="Horário fim" name="horario_fim" />
                <input type="text" placeholder="Serviços desejados" name="servicos_desejados" />
                <input type="text" placeholder="Observações" name="observacoes"/>
                <button type="submit">Agendar</button>
            </form>
        </div>
    )
}

export default Agendamento