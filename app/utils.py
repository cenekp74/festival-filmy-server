from app import app
import json

def load_config():
    with open(app.config['CONFIG_FILE_PATH'], 'r') as f:
        app.config['CONFIG'] = json.load(f)

def write_config():
    with open(app.config['CONFIG_FILE_PATH'], 'w') as f:
        json.dump(app.config['CONFIG'], f, indent=4)

def load_clients():
    with open(app.config['CLIENTS_FILE_PATH'], 'r') as f:
        app.clients = json.load(f)

def write_clients():
    with open(app.config['CLIENTS_FILE_PATH'], 'w') as f:
        json.dump(app.clients, f, indent=4)