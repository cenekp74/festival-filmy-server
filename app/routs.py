from app import app, db, bcrypt
from flask import flash, render_template, redirect, url_for, jsonify
from flask_login import login_user, logout_user, current_user
from app.db_classes import User
from app.forms import LoginForm
import requests
from app.utils import write_config, load_config

@app.route('/')
def index():
    if current_user.is_authenticated:
        return redirect(url_for('dashboard'))
    return redirect(url_for('login'))
    
@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

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
    return 200

@app.route('/get_program/<room>')
def get_program(room):
    return jsonify(app.config['CONFIG']['PROGRAM'][room])

#region login
@app.route('/login', methods=['GET', 'POST']) 
def login():
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