from flask import Blueprint, jsonify, request
from werkzeug.security import check_password_hash, generate_password_hash

from app import db
from models.usuario import Usuario


auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    """ API de Login
    """

    return jsonify(), 200


@auth_bp.route('/cadastrar_usuario/', methods=['POST'])
def post_usuario():    
    """ Cadastra novo usuario 

        body: espera receber um form-data
        form-data:
            - nome: string
            - sobrenome: string
            - email: string (obrigatorio)
            - senha: string (obrigatorio)
            
    """
    
    nome = request.form.get('nome')
    sobrenome = request.form.get('sobrenome')
    email = request.form.get('email')
    senha = request.form.get('senha')

    # Retorna erro se email ou senha nao foram informados
    if not email or not senha:
        return jsonify({
            "sucesso": False, 
            "mensagem": "Email e Senha precisam ser informados."
        })
    
    # Retorna erro se ja existir um usuario com o email informado.
    if Usuario.query.filter_by(email=email).first():
        return jsonify({
            'sucesso': False, 
            'mensagem': f'Usuario com o email `{email}` ja esta cadastrado.'
        }), 400

    # Cria objeto novo_usuario
    novo_usuario = Usuario(
        nome=nome, 
        sobrenome=sobrenome, 
        email=email, 
        senha=generate_password_hash(senha, method='sha256')
    )
    
    # Salva o novo usuario
    db.session.add(novo_usuario)
    db.session.commit()

    return jsonify({
            "sucesso": True,
            "mensagem": f"Usuario {novo_usuario.email} criado com sucesso"
    }), 200
