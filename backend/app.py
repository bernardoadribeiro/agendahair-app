from flask import Flask
from flask_migrate import Migrate
from flask_login import LoginManager

from decouple import config

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
from routes import index, usuario, auth, agendamento

app.register_blueprint(index.index_bp, url_prefix='/')
app.register_blueprint(usuario.usuario_bp, url_prefix='/')
app.register_blueprint(auth.auth_bp, url_prefix='/')
app.register_blueprint(agendamento.agendamento_bp, url_prefix='/')


# Login manager
login_manager = LoginManager(app)
login_manager.init_app(app)

@login_manager.user_loader
def load_user(id):
    return Usuario.query.get(int(id))


## Iniciliza o App
if __name__ == '__main__':
    app.run(
        debug=config('FLASK_DEBUG'), 
        host='0.0.0.0', 
    )

