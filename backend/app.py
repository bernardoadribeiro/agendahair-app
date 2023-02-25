from flask import Flask
from flask_migrate import Migrate

from decouple import config

from routes import index

from database import init_database

app = Flask(__name__)
app.secret_key = config('SECRET_KEY')


# Inicializa o Banco de Dados
db = init_database(app)
migrate = Migrate(app, db, directory='./migrations')

# Importa models
from models.usuario import Usuario
from models.agendamento import Agendamento


## Registra as rotas do app
app.register_blueprint(index.index_bp, url_prefix='/')


## Iniciliza o App
if __name__ == '__main__':
    app.run(
        debug=config('FLASK_DEBUG'), 
        host='0.0.0.0', 
    )

