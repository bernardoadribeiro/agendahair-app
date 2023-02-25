from flask_sqlalchemy import SQLAlchemy
from decouple import config

def init_database(app):
    """ Configura a conexao com o banco de dados e sua inicializacao
    """

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = config('SQLALCHEMY_TRACK_MODIFICATIONS')
    app.config['SQLALCHEMY_DATABASE_URI'] = config('SQLALCHEMY_DATABASE_URI')

    db = SQLAlchemy()
    db.init_app(app)

    return db
