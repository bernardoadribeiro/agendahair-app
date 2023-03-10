import React from "react";
import "./TabelaAgendamentos.css"

function TabelaAgendamentos(props) {   
    
    return (
        <div> 
            {props.agendamentos ?
                <div id="TabelaAgendamentos">
                    <h1>Agendamentos do Dia</h1>
                    <div>
                        <span>Código</span>
                        <span>Nome</span>
                        <span>ID</span>
                        <span>Data</span>
                        <span>Horário Início</span>
                        <span>Horário Fim</span>
                        <span>Criado em</span>
                        <span>Atualizado em</span>
                        <span>Serviços Desejados</span>
                        <span>Observações</span>
                        <span>Status</span>
                    </div>
                    {props.agendamentos.map(agendamento => (
                        <div key={agendamento.code}>
                            <span>{agendamento.code}</span>
                            <span>{agendamento.nome_cliente}</span>
                            <span>{agendamento.id}</span>
                            <span>{agendamento.data_agendamento}</span>
                            <span>{agendamento.horario_inicio}</span>
                            <span>{agendamento.horario_fim}</span>
                            <span>{agendamento.criado_em}</span>
                            <span>{agendamento.atualizado_em}</span>
                            <span>{agendamento.servicos_desejados}</span>
                            <span>{agendamento.observacoes}</span>
                            <span>{agendamento.status}</span>
                        </div>
                    ))}
                </div> : <h1>Tabela Agendamentos</h1>}
        </div>
    )
}

export default TabelaAgendamentos;
