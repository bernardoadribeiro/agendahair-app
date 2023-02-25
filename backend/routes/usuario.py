from flask import Blueprint, jsonify, abort

from models.usuario import Usuario


usuario_bp = Blueprint('usuario', __name__)

@usuario_bp.route('/usuarios', methods=['GET'])
def get_usuarios():
    """ Retorna todos os usuarios cadastrados
    """
    usuarios = Usuario.query.all() or abort(204)

    return jsonify(
        {
            'usuarios': [
                {
                    'id': usuario.id,
                    'nome': usuario.nome,
                    'sobrenome': usuario.sobrenome,
                    'email': usuario.email,
                }

                for usuario in usuarios
            ]
        }
    )

@usuario_bp.route('/usuarios/<id>', methods=['GET'])
def get_usuario(id):    
    """ Retorna o usuario que possui o ID informado na URL
    """

    usuario = Usuario.query.filter_by(id=id).first()

    if usuario is None:
        return jsonify({"error":'Usuario nao encontrado.'}), 204

    return jsonify(        
        {
            'id': usuario.id,
            'nome': usuario.nome,
            'sobrenome': usuario.sobrenome,
            'email': usuario.email,
        }
    )
