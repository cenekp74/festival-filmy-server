from flask import Flask

from flask_login import LoginManager
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SECRET_KEY'] = '5e72ba27fc6a863eed13c27e67501234ab0be9ff55ac0e34823d966c1ce4896026992f2639857117'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'

app.config['DB_SERVER'] = 'https://jsnsgekom.cz'
app.config['CONFIG_FILE_PATH'] = 'app/config.json'
app.config['CLIENTS_FILE_PATH'] = 'app/clients.json'
app.config['LOG_ARCHIVE_FOLDER'] = 'app/log_archive/'

from .utils import load_config, load_clients
load_config()
load_clients()

bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
db = SQLAlchemy(app)

from app import routs