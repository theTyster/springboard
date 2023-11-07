#! /usr/bin/env python3
from flask import Flask

app = Flask(__name__)

@app.route(f'/welcome')
def welcome():
    return "welcome"

@app.route('/welcome/home')
def welcome_home():
    return "welcome home"

@app.route('/welcome/back')
def welcome_back():
    return "welcome back"
