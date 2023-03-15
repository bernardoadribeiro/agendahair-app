import React, { useState } from "react"
import "./TabelaAgendamentos.css"
import axios from "axios"

function TabelaAgendamentos(props) {
    const [editRow, setEditRow] = useState(null)

    function handleEdit(agendamento) {
        setEditRow(agendamento.code)
    }

    function handleCancel() {
        setEditRow(null)
    }

    function handleSave(agendamento) {
        const formData = new FormData()
        Object.entries(agendamento).map((chave, valor) => {
            return formData.append(`${chave}`, valor)
        })
        try{
            axios.put(`http://localhost:5000/api/v1/agendamentos/${agendamento.id}`, formData, {headers: {'Content-Type': 'Multipart/form-data'}})
        } catch(e){
            console.log(e)
        }
        setEditRow(null)
    }

    function handleInputChange(e, agendamento) {
        agendamento[e.target.name] = e.target.value
        console.log(agendamento)
    }

    function handlDelete(agendamento){
        try{
            axios.delete(`http://localhost:5000/api/v1/agendamentos/${agendamento.id}`)
        } catch(e){
            alert(e)
        }
    }


    return (
        <div className="tabela-container">
            {props.agendamentos ? (
                <table className="tabela-agendamentos">
                    <caption>
                        <h1>Agendamentos</h1>
                    </caption>
                    <thead>
                        <tr>
                            <th>Atualizado em</th>
                            <th>Código</th>
                            <th>Criado em</th>
                            <th>Data</th>
                            <th>Horário Fim</th>
                            <th>Horário Início</th>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Observações</th>
                            <th>Serviços Desejados</th>
                            <th>Status</th>
                            <th>Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                    {props.agendamentos.map((agendamento) => {
                        return (
                            <tr key={agendamento.code}>
                                {Object.keys(agendamento).map((key) => {
                                    return (
                                        <td key={key}>
                                            {editRow === agendamento.code ? (
                                                <input placeholder={agendamento[key]} type="text" name={key} onChange={(e) => {handleInputChange(e, agendamento)}}/>
                                            ) : (
                                                agendamento[key]
                                            )}
                                        </td>
                                    );
                                })}
                                <td>
                                    {editRow === agendamento.code ? (
                                        <>
                                            <button onClick={(e) => handleSave(agendamento)}>Salvar</button>
                                            <button onClick={(e) => handlDelete(agendamento)}>Deletar</button>
                                            <button onClick={handleCancel}>Cancelar</button>
                                        </>
                                    ) : (
                                        <button onClick={() => handleEdit(agendamento)}>
                                            Editar
                                        </button>
                                    )}
                                </td>
                            </tr>
                        );
                    })}

                    </tbody>
                </table>
            ) : (
                <h1>Tabela Agendamentos</h1>
            )}
        </div>
    );
}

export default TabelaAgendamentos;