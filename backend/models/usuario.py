from flask import jsonify
from sqlalchemy_serializer import SerializerMixin
from flask_login import UserMixin

from app import db

class Usuario(db.Model, SerializerMixin, UserMixin):
    """ Tabela de usuarios do sistema
    """

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String)
    sobrenome = db.Column(db.String)
    email = db.Column(db.String, unique=True, nullable=False)
    senha = db.Column(db.String, nullable=False)

    def gera_json(self):
        """ Retorna o objeto Usuario como JSON.
        """
        return jsonify({
            'id': self.id,
            'nome': self.nome,
            'sobrenome': self.sobrenome,
            'email': self.email,
        })
