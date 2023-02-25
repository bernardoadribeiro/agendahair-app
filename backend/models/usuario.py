from sqlalchemy_serializer import SerializerMixin

from app import db

class Usuario(db.Model, SerializerMixin):
    """ Tabela de usuarios do sistema
    """

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String)
    sobrenome = db.Column(db.String)
    email = db.Column(db.String, unique=True, nullable=False)
    senha = db.Column(db.String, nullable=False)
