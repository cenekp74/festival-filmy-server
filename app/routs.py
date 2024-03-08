from app import app, db, bcrypt
from flask import flash, render_template, redirect, url_for, jsonify, abort, request
from flask_login import login_user, logout_user, current_user, login_required
from app.db_classes import User
from app.forms import LoginForm
import requests
from app.utils import write_config, load_config, write_clients, load_clients
from datetime import datetime
from datetime import timedelta

@app.route('/')
def index():
    if current_user.is_authenticated:
        return redirect(url_for('dashboard'))
    return redirect(url_for('login'))
    
@app.route('/dashboard')
@login_required
def dashboard():
    now = datetime.now()
    clients = app.clients
    for _, client in clients.items():
        difference = now - datetime.strptime(client["last_update"], "%Y.%m.%d %H:%M")
        client["last_update_age"] = "4"
        if difference < timedelta(minutes=60):
            client["last_update_age"] = "3"
        if difference < timedelta(minutes=10):
            client["last_update_age"] = "2"
        if difference < timedelta(minutes=2):
            client["last_update_age"] = "1"
    return render_template('dashboard.html', clients=clients, day=app.config['CONFIG']['current_day'])

@app.route('/fetch')
def fetch():
    rooms = requests.get(app.config['DB_SERVER'] + '/api/get_rooms_for_films').json()
    app.config['CONFIG']['ROOMS'] = rooms
    write_config()
    program = {}
    for room in app.config['CONFIG']['ROOMS']:
        program[room] = {}
        for day in ['1', '2', '3']:
            program[room][day] = requests.get(app.config['DB_SERVER'] + f'/api/query/film?room={room}&day={day}').json()
    app.config['CONFIG']['PROGRAM'] = program
    write_config()
    flash('Data ze serveru úspěšně získána')
    return redirect(url_for('dashboard'))

@app.route('/get_program/<room>')
def get_program(room):
    return jsonify(app.config['CONFIG']['PROGRAM'][room])

@app.post('/client/<client>/msg')
def cilent_msg(client):
    if client not in app.config['CONFIG']['ROOMS']: abort(400)
    if client not in app.clients:
        app.clients[client] = {}
        app.clients[client]["log"] = []
    msg = request.get_data(as_text=True)
    now = datetime.now().strftime("%Y.%m.%d %H:%M")
    app.clients[client]["log"].append((now, msg))
    app.clients[client]["last_update"] = now
    app.clients[client]["status"] = msg
    write_clients()
    return '200'

@app.route('/current_day')
def current_day():
    return str(app.config['CONFIG']['current_day'])

@login_required
@app.route('/change_current_day/<day>')
def change_current_day(day):
    if day not in ['0', '1', '2', '3']:
        flash('Zadejte číslo od 0 do 3')
        return redirect(url_for('dashboard'))
    app.config['CONFIG']['current_day'] = int(day)
    write_config()
    flash(f'Den změněn na: {day}')
    return redirect(url_for('dashboard'))

#region login
@app.route('/login', methods=['GET', 'POST']) 
def login():
    if current_user.is_authenticated:
        flash('Uživatel je již přihlášen')
        return redirect(url_for('dashboard'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user and bcrypt.check_password_hash(user.password, form.password.data):
            login_user(user, remember=form.remember.data)
            return redirect('/')
        flash('Přihlášení se nezdařilo - zkontrolujte username a heslo', 'danger')
    return render_template('login.html', form=form)

@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('login'))
#endregion login