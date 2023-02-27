import React, { useState } from "react"
import axios from "axios"
import './Agendamento.css'

function Agendamento (props) {


    const [codigo, setCodigo] = useState(0)
    const [form_data, setForm_data] = useState({
        nome_cliente: '',
        data_agendamento: '',
        horario_inicio: '',
        horario_fim: '',
        servicos_desejados: '',
        observacoes: ''
    })

    function handleBusca(e) {
        if(e.key === 'Enter')
            props.handleTabela(e.target.value)
            setCodigo(e.target.value)
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
            const res = await axios.post('http://localhost:5008/agendamentos', {"body":form_data},{
                headers: {'Content-Type': 'application/json'}
            }).then(res => console.log(res))
        } catch(e) {console.log(e)}

    }


    return (
        <div id="Agendamento">
            <h1>Agendamento</h1>

            <h4>Código</h4>
                <input type="text" placeholder="Digite o código" onKeyDown={e=>handleBusca(e)} name="codigo"/>
                <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nome completo" name="nome_cliente" value={form_data.nome} onChange={handleInputChange} />
                <input type="date" placeholder="Data" name="data_agendamento" value={form_data.data} onChange={handleInputChange} />
                <input type='text' placeholder="Status" name="status" value={form_data.status} onChange={handleInputChange} />
                <input type="time" placeholder="Horário início" name="horario_inicio" value={form_data.horarioInicio} onChange={handleInputChange} />
                <input type='time' placeholder="Horário fim" name="horario_fim" value={form_data.horarioFim} onChange={handleInputChange} />
                <input type="text" placeholder="Serviços desejados" name="servicos_desejados" value={form_data.servicos} onChange={handleInputChange} />
                <input type="text" placeholder="Observações" name="observacoes" value={form_data.observacoes} onChange={handleInputChange} />
                <button type="submit">Agendar</button>
            </form>
        </div>
    )
}

export default Agendamento