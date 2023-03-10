from flask import Blueprint, jsonify, request
from flask_login import login_user, login_required, logout_user, current_user

from werkzeug.security import check_password_hash, generate_password_hash

from flasgger import swag_from

from app import db
from models.usuario import Usuario


auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
@swag_from('../docs/login.yml')
def login():
    """ API de Login
        
        body: espera receber um form-data
        form-data:
            - email: string (obrigatorio)
            - senha: string (obrigatorio)
    """

    email = request.form.get('email')
    senha = request.form.get('senha')

    if not email or not senha:
        return jsonify({'sucesso':False, 'mensagem':'Email e senha precisam ser informados.'}), 400
    
    usuario = Usuario.query.filter_by(email=email).first()
    
    if usuario:
        if check_password_hash(usuario.senha, senha):
            login_user(usuario, remember=True) # Loga o usuario no App Flask
            return jsonify({'sucesso': True, 'mensagem':'Usuario autenticado!'}), 200
        else: 
            return jsonify({'sucesso': False, 'mensagem':'Senha incorreta.'}), 400
    else: 
        return jsonify({'sucesso': False, 'mensagem':'Usuario nao encontrado.'}), 404


@auth_bp.route('/logout', methods=['POST'])
@swag_from('../docs/logout.yml')
def logout():
    """ API de Logout
    """
    
    logout_user()
    return jsonify({'sucesso': True, 'mensagem':'Voce foi deslogado.'}), 200


@auth_bp.route('/cadastrar_usuario/', methods=['POST'])
@swag_from('../docs/cadastrar_usuario.yml')
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
        }), 400
    
    # Retorna erro se ja existir um usuario com o email informado.
    if Usuario.query.filter_by(email=email).first():
        return jsonify({
            'sucesso': False, 
            'mensagem': f'Usuario com o email `{email}` ja esta cadastrado.'
        }), 400

    
    try:
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
    
    except Exception as e:
        print('Erro:', e)
        return jsonify({
                "sucesso": False,
                "mensagem": f"Falha ao inserir o usuario {novo_usuario.email}."
        }), 400

@auth_bp.route('/usuarios/me', methods=['GET'])
#@login_required
@swag_from('../docs/usuarios_me.yml')
def usuarios_me():
    """ Retorna as informacoes do usuarios que esta logado.
    """

    return current_user.gera_json(), 200
