import React, { useState } from "react"
import axios from "axios"
import './Agendamento.css'

function Agendamento (props) {

    const [form_data, setForm_data] = useState({
        nome_cliente: '',
        data_agendamento: '',
        horario_inicio: '',
        horario_fim: '',
        servicos_desejados: '',
        observacoes: ''
    })

    function handleBusca(e) {
        e.preventDefault()
        props.handleTabela(e.target.elements)
    }

    function handleInputChange(e) {
        const {name, value} = e.target
        setForm_data(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            await axios.post('http://localhost:5000/api/v1/agendamentos', {body:form_data},{
                headers: {'Content-Type': 'multipart/form-data'}
            }).then(res => console.log(res))
        } catch(e) {console.log(e)}
    }


    return (
        <div id="Agendamento">
            <h1>Fazer consulta</h1>
            <form onSubmit={handleBusca}>
            
                
                <input type="text" placeholder="Digite o código do agendamento" name="codigo_agendamento"/>
                <input type="date" name="data_agendamento"/>
                <button type="submit">Buscar</button>
            </form>

            <h1>Agendamento</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nome completo" name="nome_cliente" value={form_data.nome} onChange={handleInputChange} />
                <input type="date" placeholder="Data" name="data_agendamento" value={form_data.data} onChange={handleInputChange} />
                <input type='text' placeholder="Status" name="status" value={form_data.status} onChange={handleInputChange} />
                <input type="time" placeholder="Horário início" name="horario_inicio" value={form_data.horario_inicio} onChange={handleInputChange} />
                <input type='time' placeholder="Horário fim" name="horario_fim" value={form_data.horario_fim} onChange={handleInputChange} />
                <input type="text" placeholder="Serviços desejados" name="servicos_desejados" value={form_data.servicos} onChange={handleInputChange} />
                <input type="text" placeholder="Observações" name="observacoes" value={form_data.observacoes} onChange={handleInputChange} />
                
                <button type="submit">Agendar</button>
            </form>
        </div>
    )
}

export default Agendamento