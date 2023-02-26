from flask import Blueprint, jsonify, request
from flask_login import login_required
from sqlalchemy.sql import func

from flasgger import swag_from

from operator import concat
import random

from app import db
from models.agendamento import Agendamento


agendamento_bp = Blueprint('agendamento', __name__)

@agendamento_bp.route('/agendamentos', methods=['GET'])
@login_required
@swag_from('../docs/agendamentos_get.yml')
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


@agendamento_bp.route('/agendamentos/<codigo>', methods=['GET'])
@swag_from('../docs/agendamentos_get_code.yml')
def get_agendamentos_code(codigo):
    """ Retorna um agendamento filtrando pelo código informado na URL
        body: <vazio>
        Filtros:
            - codigo_agendamento: string -> Codigo do agendamento
    """

    try:
        agendamento = Agendamento.query.filter_by(code=codigo).first()
        return jsonify([ agendamento.to_dict() ])

    except Exception as e:
        print('Erro: ', e)
        return jsonify({
            'sucesso': False, 
            'mensagem': 'Agendamento não encontrado.',
        }), 404


@agendamento_bp.route('/agendamentos', methods=['POST'])
@login_required
@swag_from('../docs/agendamentos_post.yml')
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

    body = request.form.to_dict()
    if not body:
        return jsonify({'sucesso': False, 'mensagem':'Nenhum dado foi informado. Informe os dados corretamente.'}), 400

    try:
        codigo_gerado = gera_codigo()

        novo_agendamento = Agendamento(
            code=codigo_gerado,
            nome_cliente=body['nome_cliente'],
            data_agendamento=body['data_agendamento'],
            horario_inicio=body['horario_inicio'],
            horario_fim=body['horario_fim'],
            status='Nao_Confirmado',
        )
        # servicos_desejados e observacoes sao campos opcionais
        if 'servicos_desejados' in body:
            novo_agendamento.servicos_desejados = body['servicos_desejados']
        if 'observacoes' in body:
            novo_agendamento.observacoes = body['observacoes']

        db.session.add(novo_agendamento)
        db.session.commit()

        return jsonify({
            'sucesso': True, 
            'mensagem': 'Agendamento inserido com sucesso',
            'novo_agendamento': [novo_agendamento.to_dict()]
        })
    
    except Exception as e:
        print('Erro: ', e)
        return jsonify({
            'sucesso': False, 
            'mensagem': 'Falha ao inserir o agendamento.',
        }), 400



@agendamento_bp.route('/agendamentos/<id>', methods=['PUT'])
@login_required
@swag_from('../docs/agendamentos_put.yml')
def put_agendamento(id):
    """ Atualiza o agendamento do ID informado na URL com os dados informados no form-data
        body: espera receber um form-data
        form-data:
            - nome_cliente: string (obrigatorio)
            - data_agendamento: Date `yyyy-mm-dd` (obrigatorio)
            - horario_inicio: Time (obrigatorio)
            - horario_fim: Time (obrigatorio)
            - status: string : `[Nao_Confirmado, Confirmado]` (obrigatorio)
            - servicos_desejados:  string
            - observacoes: string
    """

    body = request.form.to_dict()
    if not body:
        return jsonify({'sucesso': False, 'mensagem':'Nenhum dado foi informado. Informe os dados corretamente.'}), 400

    agendamento = Agendamento.query.filter_by(id=id).first()
    if not agendamento:
        return jsonify({'sucesso': False, 'mensagem':'Agendamento nao encontrado.'}), 400

    try:
        # Atualiza os dados do objeto informado
        agendamento.atualizado_em = func.now()
        if 'nome_cliente' in body:
            agendamento.nome_cliente = body['nome_cliente'],
        if 'data_agendamento' in body:
            agendamento.data_agendamento = body['data_agendamento']
        if 'horario_inicio' in body:
            agendamento.horario_inicio = body['horario_inicio']
        if 'horario_fim' in body:
            agendamento.horario_fim = body['horario_fim']
        if 'status' in body:
            agendamento.status = body['status']
        if 'servicos_desejados' in body:
            agendamento.servicos_desejados = body['servicos_desejados']
        if 'observacoes' in body:
            agendamento.observacoes = body['observacoes']
        
        db.session.commit()
        
        return jsonify({
            'sucesso': True, 
            'mensagem': 'Agendamento atualizado com sucesso.',
            'agendamento_atualizado': [agendamento.to_dict()]
        })
    
    except Exception as e:
        print('Erro: ', e)
        return jsonify({
            'sucesso': False, 
            'mensagem': 'Falha ao atualizar o agendamento.',
        }), 400


@agendamento_bp.route('/agendamentos/<id>', methods=['DELETE'])
@login_required
@swag_from('../docs/agendamentos_delete.yml')
def delete_agendamento(id):
    """ Deleta o agendamento do ID informado na URL
        body: <vazio>
    """

    agendamento = Agendamento.query.filter_by(id=id).first()
    if not agendamento:
        return jsonify({'sucesso': False, 'mensagem':'Agendamento nao encontrado.'}), 400
    
    try:
        db.session.delete(agendamento)
        db.session.commit()

        return jsonify({
            'sucesso': True, 
            'mensagem': 'Agendamento deletado com sucesso.',
        })
    
    except Exception as e:
        print('Erro: ', e)
        return jsonify({
            'sucesso': False, 
            'mensagem': 'Falha ao deletar o agendamento.',
        }), 400
    

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
