from flask import Flask

from flask_login import LoginManager
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.secret_key = 'dev'
app.config.from_pyfile('../instance/config.py')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'

app.config['DB_SERVER'] = 'https://jsnsgekom.cz'
app.config['CONFIG_FILE_PATH'] = 'app/config.json'
app.config['CLIENTS_FILE_PATH'] = 'app/clients.json'
app.config['LOG_ARCHIVE_FOLDER'] = 'app/log_archive/'

app.config['SPOT'] = {
    "1":"spot1.mp4",
    "2":"spot2.mp4",
    "3":"spot3.mp4"
}

from .utils import load_config, load_clients
load_config()
load_clients()

bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
db = SQLAlchemy(app)

from app import routs