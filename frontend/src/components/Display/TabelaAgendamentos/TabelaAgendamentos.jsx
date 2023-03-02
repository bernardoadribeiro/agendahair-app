import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TabelaAgendamentos.css"

function TabelaAgendamentos(props) {   


    return (
        <> 
            {props.agendamentos ?
                <table id="TabelaAgendamentos">
                    <caption><h1>Agendamentos do Dia</h1></caption>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nome</th>
                            <th>Horário Início</th>
                            <th>Horário Final</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.agendamentos.map(agendamento => (
                            <tr key={agendamento.codigo}>
                                <td>{agendamento.codigo}</td>
                                <td>{agendamento.nome}</td>
                                <td>{agendamento.horarioInicio}</td>
                                <td>{agendamento.horarioFinal}</td>
                                <td>{agendamento.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table> : <h1>Tabela Agendamentos</h1>}
        </>
    )
}

export default TabelaAgendamentos