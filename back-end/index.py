import requests
from flask import Flask, request, render_template, jsonify
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

SHEETDB_API_URL = "https://sheetdb.io/api/v1/r64qchfgphnps"  # ← replace this

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/signin', methods=['GET', 'POST'])
def signin():
    if request.method == 'POST':
        data     = request.get_json()
        email    = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({ 'error': 'Email and password are required' }), 400

        # Fetch user from SheetDB
        response = requests.get("https://sheetdb.io/api/v1/r64qchfgphnps" + '/search', params={ 'email': email })
        users    = response.json()

        if not users:
            return jsonify({ 'error': 'User not found' }), 404

        user           = users[0]
        stored_hash    = user.get('password')

        if not check_password_hash(stored_hash, password):
            return jsonify({ 'error': 'Incorrect password' }), 401

        return jsonify({ 'message': 'Welcome back, ' + email }), 200

    return render_template('index.html')


@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        data     = request.get_json()
        email    = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({ 'error': 'Email and password are required' }), 400

        # Check if user already exists
        response = requests.get(SHEETDB_API_URL + '/search', params={ 'email': email })
        existing = response.json()

        if existing:
            return jsonify({ 'error': 'Email already registered' }), 409

        # Hash password and save to SheetDB
        hashed = generate_password_hash(password)
        payload = { 'data': [{ 'email': email, 'password': hashed }] }
        requests.post(SHEETDB_API_URL, json=payload)

        return jsonify({ 'message': 'Account created for ' + email }), 201

    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
