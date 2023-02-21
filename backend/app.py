from flask import Flask
from decouple import config

from routes import index


app = Flask(__name__)
app.secret_key = config('SECRET_KEY')


## Register app routes ##
app.register_blueprint(index.index_bp, url_prefix='/')


## App start ##
if __name__ == '__main__':
    app.run(
        debug=config('FLASK_DEBUG'), 
        host='0.0.0.0', 
    )

