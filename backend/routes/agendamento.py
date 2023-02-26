from operator import concat
import random
from flask import Blueprint, jsonify, request

from app import db
from models.agendamento import Agendamento

agendamento_bp = Blueprint('agendamento', __name__)

@agendamento_bp.route('/agendamentos', methods=['GET'])
def get_agendamentos():
    """ Retorna todos os agendamentos realizados com filtros
        body: espera receber um form-data
        Filtros:
            - data_agendamento: Date -> Data do agendamento no formato `yyyy-mm-dd`
            - codigo_agendamento: string -> Codigo do agendamento
    """

    data_agendamento = request.form.get('data_agendamento')
    codigo_agendamento = request.form.get('codigo_agendamento')


    if data_agendamento:
        agendamentos = Agendamento.query.filter_by(data_agendamento=data_agendamento)

    elif codigo_agendamento:
        agendamentos = Agendamento.query.filter_by(code=codigo_agendamento)

    else:
        agendamentos = Agendamento.query.all()
    
    return jsonify(
        [agendamento.to_dict() for agendamento in agendamentos]
    )


@agendamento_bp.route('/agendamentos', methods=['POST', 'PUT'])
def post_agendamento():
    """ Insere um novo agendamento com os dados informados no form-data
        body: espera receber um form-data
        form-data:
            - codigo: string
            - nome_cliente: string
            - data_agendamento: Date `yyyy-mm-dd`
            - horario_inicio: Time
            - horario_fim: Time
            - status: string (Confirmado, Nao_Confirmado)
            - servicos_desejados:  string
            - observacoes: string
    """

    data = request.form.to_dict()
    if not data:
        return jsonify({'sucesso': False, 'mensagem':'Nenhum dado foi informado. Informe os dados corretamente.'}), 400

    novo_agendamento = Agendamento(
        code=data['code'],
        nome_cliente=data['nome_cliente'],
        data_agendamento=data['data_agendamento'],
        horario_inicio=data['horario_inicio'],
        horario_fim=data['horario_fim'],
        status='Nao_Confirmado',
        servicos_desejados=data['servicos_desejados'],
        observacoes=data['observacoes'],
    )

    db.session.add(novo_agendamento)
    db.session.commit()

    return jsonify({
        'sucesso': True, 
        'mensagem': 'Agendamento inserido com sucesso',
        'novo_agendamento': [novo_agendamento.to_dict()]
    })

