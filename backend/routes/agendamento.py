from operator import concat
import random
from flask import Blueprint, jsonify, request
from flask_login import login_required

from app import db
from models.agendamento import Agendamento

agendamento_bp = Blueprint('agendamento', __name__)

@agendamento_bp.route('/agendamentos', methods=['GET'])
@login_required
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


@agendamento_bp.route('/agendamentos', methods=['POST'])
@login_required
def post_agendamento():
    """ Insere um novo agendamento com os dados informados no form-data
        body: espera receber um form-data
        form-data:
            - nome_cliente: string (obrigatorio)
            - data_agendamento: Date `yyyy-mm-dd` (obrigatorio)
            - horario_inicio: Time (obrigatorio)
            - horario_fim: Time (obrigatorio)
            - servicos_desejados:  string
            - observacoes: string
    """

    data = request.form.to_dict()
    if not data:
        return jsonify({'sucesso': False, 'mensagem':'Nenhum dado foi informado. Informe os dados corretamente.'}), 400

    codigo_gerado = gera_codigo()

    novo_agendamento = Agendamento(
        code=codigo_gerado,
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


def gera_codigo():
    """ Gerador automatico de codigo unico para cada agendamento.
        Retorno: Codigo no formato `ABCD12`
    """

    q_letra, q_num = 4, 2

    codigo = ''
    letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W','X', 'Y', 'Z']
    numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

    for i in range(q_letra):
        c = random.choice(letras)
        codigo = concat(codigo, c)
    for i in range(q_num):
        n = random.choice(numeros)
        codigo = concat(codigo, str(n))

    if verifica_codigo(codigo) is True:
        gera_codigo()
    else:
        return codigo


def verifica_codigo(codigo):
    """ Verifica se ja existe outro registro com o codigo informado.
    """

    agendamento = Agendamento.query.filter_by(code=codigo).first()

    if agendamento:
        return True
    else: 
        return False
